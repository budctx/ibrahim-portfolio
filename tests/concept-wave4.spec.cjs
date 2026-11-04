const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const BASE=process.env.CONCEPT_BASE_URL||'http://127.0.0.1:3201';
const routes=[{file:'ar',lang:'ar',dir:'rtl'},{file:'en',lang:'en',dir:'ltr'}];
test.beforeAll(()=>fs.mkdirSync('concept-evidence',{recursive:true}));
for(const locale of routes){
  test('Concept 04 scenes + bilingual + work + modal: '+locale.lang,async({page})=>{
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(BASE+'/concept-v2/'+locale.file+'.html',{waitUntil:'domcontentloaded'});
    await expect(page.locator('html')).toHaveAttribute('lang',locale.lang);
    await expect(page.locator('html')).toHaveAttribute('dir',locale.dir);
    await expect(page.locator('.scene-dot')).toHaveCount(5);
    for(const id of ['main','work','approach','about','contact'])await expect(page.locator('#'+id)).toHaveCount(1);
    await expect(page.locator('#card')).toHaveCount(1); // approved existing hero unchanged.
    await expect(page.locator('.concept-work-card')).toHaveCount(2);
    await page.locator('.scene-dot[data-scene=work]').click();
    await expect(page.locator('#work')).toHaveClass(/is-active/,{timeout:10000});
    await expect(page.locator('.concept-gallery-card')).toHaveAttribute('href','/concept-v2/gallery.html?lang='+locale.lang);
    await page.screenshot({path:'concept-evidence/'+locale.lang+'-work-desktop.png',fullPage:false,animations:'disabled'});
    await page.locator('.scene-dot[data-scene=approach]').click();
    await expect(page.locator('#approach')).toHaveClass(/is-active/,{timeout:10000});
    await page.screenshot({path:'concept-evidence/'+locale.lang+'-approach-desktop.png',fullPage:false,animations:'disabled'});
    await page.locator('.scene-dot[data-scene=about]').click();
    await expect(page.locator('#about')).toHaveClass(/is-active/,{timeout:10000});
    await page.locator('.scene-dot[data-scene=contact]').click();
    await expect(page.locator('#contact')).toHaveClass(/is-active/,{timeout:10000});
    await page.locator('#contact-trigger').click();
    await expect(page.locator('#contact-modal')).toHaveJSProperty('open',true);
    await page.locator('#contact-modal-close').click();
    await expect(page.locator('#contact-modal')).toHaveJSProperty('open',false);
    expect(errors).toEqual([]);
  });
  test('Concept 04 mobile, reduced motion + gallery: '+locale.lang,async({page})=>{
    await page.setViewportSize({width:390,height:844});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto(BASE+'/concept-v2/'+locale.file+'.html',{waitUntil:'networkidle'});
    await page.locator('.scene-dot[data-scene=work]').click();
    await expect(page.locator('#work')).toHaveClass(/is-active/,{timeout:10000});
    const metrics=await page.evaluate(()=>({w:document.documentElement.clientWidth,sw:document.documentElement.scrollWidth}));
    expect(metrics.sw).toBeLessThanOrEqual(metrics.w+1);
    await page.screenshot({path:'concept-evidence/'+locale.lang+'-work-mobile.png',fullPage:false,animations:'disabled'});
    await page.locator('.scene-dot[data-scene=approach]').click();
    await expect(page.locator('#approach')).toHaveClass(/is-active/,{timeout:10000});
    await page.screenshot({path:'concept-evidence/'+locale.lang+'-approach-mobile.png',fullPage:false,animations:'disabled'});
    await page.goto(BASE+'/concept-v2/gallery.html?lang='+locale.lang,{waitUntil:'networkidle'});
    await expect(page.locator('.glb-item')).toHaveCount(4);
    const images=await page.locator('.glb-item img').evaluateAll(els=>els.map(e=>({loaded:e.complete&&e.naturalWidth>0,url:e.src})));
    expect(images.every(x=>x.loaded),JSON.stringify(images)).toBe(true);
    await page.screenshot({path:'concept-evidence/'+locale.lang+'-gallery-mobile.png',fullPage:false,animations:'disabled'});
    await page.locator('.glb-item').first().click();
    await expect(page.locator('#lightbox')).toHaveJSProperty('open',true);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#counter')).toContainText('02 / 04');
    await page.keyboard.press('Escape');
    await expect(page.locator('#lightbox')).toHaveJSProperty('open',false);
  });
}