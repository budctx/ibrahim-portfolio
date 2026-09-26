const {test, expect} = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const BASE = 'http://127.0.0.1:3000';
const output = 'test-results/visuals';

test('capture eight authored homepage states and two secondary views', async ({page}) => {
  fs.mkdirSync(output,{recursive:true});
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const locale of ['ar','en']){
    const route=locale==='ar'?'/':'/en';
    for(const width of [390,1440]){
      for(const theme of ['dark','light']){
        await page.setViewportSize({width,height:900});
        await page.goto(BASE+route,{waitUntil:'networkidle'});
        await page.evaluate(async theme=>{
          localStorage.setItem('portfolio-theme',theme);
          document.documentElement.dataset.theme=theme;
          await document.fonts.ready;
        },theme);
        await page.reload({waitUntil:'networkidle'});
        await expect(page.locator('main.xp')).toBeVisible();
        await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
        await page.screenshot({path:path.join(output,`home-${locale}-${theme}-${width}.png`),fullPage:true,animations:'disabled'});
      }
    }
  }
  for(const route of ['/ar/work','/playground']){
    await page.setViewportSize({width:390,height:900});
    await page.goto(BASE+route,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:path.join(output,route.includes('work')?'work-ar-mobile.png':'playground-en-mobile.png'),fullPage:true,animations:'disabled'});
  }
});
