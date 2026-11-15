const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
for(const locale of ['en','ar']) for(const width of [390,768,1440]) {
 test(`${locale} ${width}: evidence, responsive layout, themes and accessibility`,async({page})=>{
  await page.setViewportSize({width,height:900});
  const prefix=locale==='ar'?'/ar':'';
  const response=await page.goto(`${prefix}/projects/bud-discord-events`);
  expect(response.status()).toBe(200);
  await expect(page.locator('main')).toHaveAttribute('dir',locale==='ar'?'rtl':'ltr');
  await expect(page.locator('h1')).toContainText(locale==='ar'?'بُعد':"BU'D");
  expect(await page.locator('meta[name="robots"]').getAttribute('content')).toContain('noindex');
  const media=page.locator('.caseEvidence img');
  await expect(media).toHaveCount(5);
  for(const img of await media.all()) {
   expect((await img.getAttribute('alt')).length).toBeGreaterThan(10);
   await img.scrollIntoViewIfNeeded();
   await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for(const theme of ['light','dark']) {
   const current=await page.locator('html').getAttribute('data-theme');
   if(current!==theme) await page.getByRole('button',{name:/Use (dark|light) mode|استخدام الوضع/}).click();
   await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
   const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   expect(scan.violations).toEqual([]);
  }
  await page.locator('.caseContents a[href="#decisions"]').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#decisions$/);
  await page.locator('.portfolioHeader .portfolioLanguage').click();
  await expect(page.locator('main')).toHaveAttribute('lang',locale==='ar'?'en':'ar');
  await expect(page.locator('h1')).toBeVisible();
 });
}
test('draft stays absent from public work listing',async({page})=>{
 await page.goto('/work');
 await expect(page.locator('a[href="/projects/bud-discord-events"]')).toHaveCount(0);
});

for(const locale of ['en','ar']) for(const width of [390,768,1440]) {
 test(`published-home design parity: ${locale} ${width}`,async({page})=>{
  await page.setViewportSize({width,height:900});
  const prefix=locale==='ar'?'/ar':'';
  const home=locale==='ar'?'/':'/en';
  const displayName=locale==='ar'?'إبراهيم العجمي':'Ibrahim Al-Ajmi';
  // The live homepage is a static Readex Pro scene via next.config rewrites,
  // not the unpublished React cvPage homepage.
  await page.goto(home);
  await expect(page.locator('.wordmark')).toContainText(displayName);
  for(const route of ['/work','/about','/playground','/projects/bud-discord-events']) {
   const response=await page.goto(prefix+route);
   expect(response.status()).toBe(200);
   await expect(page.locator('main')).toHaveClass(/cvInteriorPage/);
   const header=page.locator('.portfolioHeader');
   await expect(header).toBeVisible();
   await expect(header.locator('.portfolioWordmark')).toContainText(displayName);
   await expect(header.locator('.portfolioWordmark small')).toHaveText('PORTFOLIO / 2026');
   await expect(page.locator('.cvInteriorFrame')).toBeVisible();
   const computed=await page.locator('main').evaluate(el=>({
    font:getComputedStyle(el).fontFamily,
    color:getComputedStyle(el).color,
   }));
   expect(computed.font).toContain('Readex Pro');
   expect(computed.color).toBe('rgb(243, 244, 245)');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.locator('.portfolioHeader .portfolioNavigation').getByRole('link',{name:locale==='ar'?'الأعمال':'Work',exact:true}).click();
  await expect(page).toHaveURL(new RegExp(`${prefix}/work$`));
  await page.locator('.portfolioHeader .portfolioLanguage').click();
  await expect(page.locator('main')).toHaveAttribute('lang',locale==='ar'?'en':'ar');
 });
}
