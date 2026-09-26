const {test, expect} = require('@playwright/test');
const BASE = 'http://127.0.0.1:3000';
const routes = [
  {path:'/work', lang:'en',dir:'ltr',kind:'work'},
  {path:'/ar/work',lang:'ar',dir:'rtl',kind:'work'},
  {path:'/about',lang:'en',dir:'ltr',kind:'about'},
  {path:'/ar/about',lang:'ar',dir:'rtl',kind:'about'},
  {path:'/playground',lang:'en',dir:'ltr',kind:'playground'},
  {path:'/ar/playground',lang:'ar',dir:'rtl',kind:'playground'},
];

for(const route of routes){
  test(`secondary experience ${route.path} is usable at 320 and 1440`,async({page})=>{
    for(const width of [320,1440]){
      await page.setViewportSize({width,height:850});
      await page.goto(BASE+route.path,{waitUntil:'networkidle'});
      await expect(page.locator('html')).toHaveAttribute('lang',route.lang);
      await expect(page.locator('html')).toHaveAttribute('dir',route.dir);
      await expect(page.locator('main.xpInterior h1')).toHaveCount(1);
      await expect(page.locator('header .xpLanguage')).toBeVisible();
      const sizes=await page.evaluate(()=>({
        width:document.documentElement.clientWidth,
        scroll:document.documentElement.scrollWidth,
        header:document.querySelector('.xpHeader').getBoundingClientRect().width,
        hero:document.querySelector('.xpInnerHero').getBoundingClientRect().width,
      }));
      expect(sizes.scroll,JSON.stringify(sizes)).toBeLessThanOrEqual(sizes.width+1);
      expect(sizes.hero).toBeLessThanOrEqual(width);
    }
    if(route.kind==='work') {
      await expect(page.locator('.xpEmptyWork')).toBeVisible();
      await expect(page.locator('.xpProjectGrid .projectCard')).toHaveCount(0);
    }
    if(route.kind==='playground') await expect(page.locator('.xpConsoleTabs button')).toHaveCount(3);
    if(route.kind==='about') await expect(page.locator('.xpInsideStatements article')).toHaveCount(3);
    await expect(page.locator('.xpFloatingContact')).toHaveAttribute('href',route.lang==='ar'?'/#contact':'/en#contact');
  });
}
