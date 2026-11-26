const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const BASE=process.env.CONCEPT_BASE_URL||'http://127.0.0.1:3201';
const sizes=[[568,320],[667,375],[740,360],[320,568],[360,667],[390,844],[430,844],[768,1024],[1024,768],[1440,900],[1920,1080],[844,390],[390,568],[390,667],[1440,568]];
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
   if(id==='main'){
    const badge=await page.locator('.card').boundingBox();
    expect(badge.width,'Badge keeps a discoverable visual scale').toBeGreaterThanOrEqual(85);
    expect(badge.y+badge.height).toBeLessThanOrEqual(height);
   }
   if(id==='about'&&width>height&&height<=550){
    const clearance=await page.evaluate(()=>{const bottom=Math.max(...[...document.querySelectorAll('.cube-skills span')].map(e=>e.getBoundingClientRect().bottom));return document.querySelector('.cube-controls').getBoundingClientRect().top-bottom});
    expect(clearance,'Skill labels must clear cube selectors').toBeGreaterThanOrEqual(8);
   }
   if(id==='work')for(const i of [0,4,1,3,2,0]){
    await page.locator('[data-work-index="'+i+'"]').click();await expect(page.locator('[data-work-index="'+i+'"]')).toHaveAttribute('aria-current','true');
    const card=await page.locator('.concept-work-card').nth(i).boundingBox();expect(card.x).toBeGreaterThanOrEqual(-1);expect(card.x+card.width).toBeLessThanOrEqual(width+1);expect(card.y+card.height).toBeLessThanOrEqual(height+1);
    const clipped=await page.locator('.concept-work-card').nth(i).evaluate(e=>{const c=e.getBoundingClientRect();return [...e.querySelectorAll('.category,h3,.concept-card-meta p')].filter(x=>{const r=x.getBoundingClientRect();return r.top<c.top-1||r.bottom>c.bottom+1||r.left<c.left-1||r.right>c.right+1}).map(x=>x.textContent)});
    expect(clipped,'Every selected card must show its entire category, title and summary').toEqual([]);
   }
   if(id==='contact'){
    const hit=await page.locator('#contact-trigger').evaluate(el=>{const r=el.getBoundingClientRect(),f=document.querySelector('.contact-footer').getBoundingClientRect();return {bottom:r.bottom,footerTop:f.top,points:[[.5,.5],[.25,.5],[.75,.5],[.5,.25],[.5,.75]].every(([x,y])=>el.contains(document.elementFromPoint(r.x+r.width*x,r.y+r.height*y)))}});
    expect(hit.bottom).toBeLessThanOrEqual(hit.footerTop);expect(hit.points,'Footer must not intercept the contact target').toBe(true);
    for(const opener of ['#contact-trigger','#envelope-button']){await page.locator(opener).click();await expect(page.locator('#contact-modal')).toHaveJSProperty('open',true);await page.keyboard.press('Escape');await expect(page.locator(opener)).toBeFocused()}
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
