const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const BASE=process.env.CONCEPT_BASE_URL||'http://127.0.0.1:3201';
const sizes=[[320,568],[360,667],[390,844],[430,844],[768,1024],[1024,768],[1440,900],[1920,1080],[844,390],[390,568],[390,667],[1440,568]];
for(const [width,height] of sizes)for(const lang of ['ar','en'])for(const theme of ['dark','light']){
 test(`Viewport contract ${width}x${height} ${lang} ${theme}`,async({page,context})=>{
  await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'reduce'});
  // Optional faithful font replay for isolated environments; CI uses the real font origin.
  if(process.env.CONCEPT_FONT_CACHE){const dir=process.env.CONCEPT_FONT_CACHE,manifest=JSON.parse(fs.readFileSync(dir+'/manifest.json','utf8'));await context.route('https://fonts.googleapis.com/**',r=>r.fulfill({contentType:'text/css',body:fs.readFileSync(dir+'/font.css','utf8')}));await context.route('https://fonts.gstatic.com/**',r=>manifest[r.request().url()]?r.fulfill({contentType:'font/woff2',body:fs.readFileSync(manifest[r.request().url()])}):r.abort())}
  await page.addInitScript(t=>localStorage.setItem('portfolio-theme',t),theme);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(BASE+'/concept-v2/'+lang+'.html',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))]));
  await expect(page.locator('.concept-tools')).toHaveCSS('position','static');
  await expect(page.locator('#main .concept-tools')).toHaveCount(1);
  for(const id of ['main','work','approach','about','contact']){
   await page.locator('[data-scene='+id+']').click();await expect(page.locator('#'+id)).toHaveClass(/is-active/);
   const metrics=await page.locator('#'+id).evaluate(e=>({height:e.getBoundingClientRect().height,scroll:e.scrollHeight,client:e.clientHeight,bg:getComputedStyle(e).backgroundColor}));
   expect(Math.abs(metrics.height-height)).toBeLessThanOrEqual(1);expect(metrics.scroll,id+' must not clip vertically').toBeLessThanOrEqual(metrics.client+2);
   if(id!=='main'){
    expect(metrics.bg).toBe(theme==='dark'?'rgb(14, 24, 31)':'rgb(244, 245, 242)');
    const tool=await page.locator('.concept-tools').boundingBox();expect(tool.y+tool.height).toBeLessThanOrEqual(0);
   }
   if(id==='work')for(let i=0;i<5;i++){
    await page.locator('[data-work-index="'+i+'"]').click();await expect(page.locator('[data-work-index="'+i+'"]')).toHaveAttribute('aria-current','true');
    const card=await page.locator('.concept-work-card').nth(i).boundingBox();expect(card.x).toBeGreaterThanOrEqual(-1);expect(card.x+card.width).toBeLessThanOrEqual(width+1);expect(card.y+card.height).toBeLessThanOrEqual(height+1);
   }
   if(id==='approach')for(let i=0;i<3;i++){
    const d=page.locator('.concept-method-card').nth(i);if(!await d.evaluate(e=>e.open))await d.locator('summary').click();
    expect(await page.locator('.concept-method-card[open]').count()).toBe(1);
    expect(await page.locator('#approach').evaluate(e=>e.scrollHeight-e.clientHeight)).toBeLessThanOrEqual(2);
    const last=await page.locator('.concept-method').boundingBox();expect(last.y+last.height).toBeLessThanOrEqual(height+1);
   }
  }
  expect(errors).toEqual([]);
 });
}
