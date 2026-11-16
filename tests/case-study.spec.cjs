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

test('shared homepage carousel opens BU\'D preview through the real Work modal', async({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/#work');
  await page.locator('[data-scene="work"]').click();
  await expect(page.locator('#work.scene')).toHaveClass(/is-active/);
  const card=page.locator('#project-track .project-card').filter({hasText:'بُعد'});
  await expect(card).toHaveCount(1);
  await card.click();
  const dialog=page.locator('#project-modal');
  await expect(dialog).toBeVisible();
  const cta=dialog.locator('#modal-link');
  await expect(cta).toHaveAttribute('href','/ar/projects/bud-discord-events');
  await expect(cta).toHaveText('عرض المشروع');
  await cta.click();
  await expect(page).toHaveURL(/\/ar\/projects\/bud-discord-events$/);
  await expect(page.locator('.relatedWork[data-ready="true"]')).toBeVisible();
  await expect(page.locator('.relatedWork .project-card')).toHaveCount(2);
  await page.getByRole('link',{name:'العودة إلى الأعمال',exact:true}).click();
  await expect(page).toHaveURL(/\/#work$/);
});

for(const locale of ['en','ar']) {
 test(`shared related Work carousel has original cards, modal and return navigation: ${locale}`,async({page})=>{
  const prefix=locale==='ar'?'/ar':'';
  await page.setViewportSize({width:390,height:844});
  await page.goto(`${prefix}/projects/bud-discord-events`);
  const section=page.locator('[data-related-work]');
  await expect(section).toHaveAttribute('data-ready','true');
  await expect(section.locator('.project-card')).toHaveCount(2);
  const cards=section.locator('.project-card');
  await cards.first().click();
  const modal=section.locator('dialog.project-modal');
  await expect(modal).toBeVisible();
  await expect(modal.locator('#modal-title')).toContainText(locale==='ar'?'أثر':'ATHAR');
  await expect(modal.locator('#modal-link')).toHaveAttribute('href','https://atharca.vercel.app/');
  await modal.locator('#modal-close').click();
  await expect(modal).not.toBeVisible();
  await expect(cards.first()).toBeFocused();
  await cards.nth(1).click();
  await expect(modal).toBeVisible();
  await expect(modal.locator('#modal-link')).toHaveAttribute('href',locale==='ar'?'/ar/work/graphic-design':'/work/graphic-design');
  await modal.locator('#modal-close').click();
  await expect(section.locator('.carousel-count')).not.toBeEmpty();
  const back=page.getByRole('link',{name:locale==='ar'?'العودة إلى الأعمال':'Back to work',exact:true});
  await expect(back).toHaveAttribute('href',locale==='ar'?'/#work':'/en#work');
  await expect(page.locator('.projectFooterNav').getByRole('link',{name:locale==='ar'?'العودة للرئيسية':'Back to homepage',exact:true})).toHaveAttribute('href',locale==='ar'?'/':'/en');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 });
}
