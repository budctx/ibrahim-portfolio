const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
const cats=['discord','brand-identity','social-campaigns','print-packaging'];
const route=(lang,c='discord')=>`${lang==='ar'?'/ar':''}/work/${c}`;
const modal=p=>p.locator('#project-modal');
async function open(p,lang='en'){await p.goto(route(lang));await p.locator('[data-design]').click();await expect(modal(p)).toBeVisible();}
async function overflow(p){expect(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();}
for(const lang of ['en','ar']) {
 test(`${lang} four categories landing and publication boundaries`,async({page})=>{
  await page.goto(route(lang,'graphic-design'));await expect(page.locator('.category-link')).toHaveCount(4);
  await expect(page.locator('html')).toHaveAttribute('dir',lang==='ar'?'rtl':'ltr');
  for(const c of cats){await page.goto(route(lang,c));await expect(page.locator('[data-design]')).toHaveCount(1);await expect(page.locator('[data-design]')).toContainText(lang==='ar'?'اختبار المعاينة':'PREVIEW TEST');await overflow(page);}
  for(const slug of ['unknown','draft-design','hidden-design']) {await page.goto(route(lang)+`?design=${slug}`);await expect(modal(page)).not.toBeVisible();await expect(page).not.toHaveURL(/design=/);await expect(page.locator('#gallery-notice')).toBeVisible();}
 });
 test(`${lang} modal keyboard focus, close and image proportions`,async({page})=>{
  await open(page,lang);await expect(page).toHaveURL(/design=preview-test-discord/);
  expect(await page.locator('body').evaluate(e=>getComputedStyle(e).overflow)).toBe('hidden');
  await expect(page.locator('#modal-art img')).toHaveCount(2);
  expect(await page.locator('#modal-art img').first().evaluate(e=>getComputedStyle(e).objectFit)).toBe('contain');
  await page.locator('#modal-close').focus();await page.keyboard.press('Shift+Tab');await expect(page.locator('.modal-share')).toBeFocused();
  await page.keyboard.press('Tab');await expect(page.locator('#modal-close')).toBeFocused();
  await page.keyboard.press('Escape');await expect(modal(page)).not.toBeVisible();await expect(page).not.toHaveURL(/design=/);await expect(page.locator('[data-design]')).toBeFocused();
  await page.locator('[data-design]').click();await page.locator('#modal-close').click();await expect(page).not.toHaveURL(/design=/);
 });
 test(`${lang} deep link reload history and direct close`,async({page})=>{
  await page.goto(route(lang)+ '?design=preview-test-discord');await expect(modal(page)).toBeVisible();await page.reload();await expect(modal(page)).toBeVisible();
  await page.locator('#modal-close').click();await expect(page).toHaveURL(new RegExp(route(lang)+'$'));
  await page.locator('[data-design]').click();await page.goBack();await expect(modal(page)).not.toBeVisible();await page.goForward();await expect(modal(page)).toBeVisible();
  await page.locator('#modal-close').click();await expect(page).not.toHaveURL(/design=/);await page.locator('[data-design]').click();await expect(modal(page)).toBeVisible();await expect(page).toHaveURL(/design=/);
 });
 test(`${lang} selected design preserved by language link`,async({page})=>{
  await open(page,lang);const href=await page.locator('#gallery-language').getAttribute('href');expect(href).toContain('design=preview-test-discord');
  await page.locator('#modal-language').click();await expect(modal(page)).toBeVisible();await expect(page.locator('html')).toHaveAttribute('lang',lang==='ar'?'en':'ar');
 });
}
for(const [w,h] of [[320,568],[390,844],[768,1024],[1440,900],[1920,1080],[844,390]])for(const lang of ['en','ar']) {
 test(`${lang} responsive ${w}x${h}`,async({page})=>{
  await page.setViewportSize({width:w,height:h});await page.goto(route(lang,'graphic-design'));await overflow(page);await expect(page.locator('.category-link')).toHaveCount(4);
  await open(page,lang);await overflow(page);
  const close=await page.locator('#modal-close').boundingBox();expect(close.x).toBeGreaterThanOrEqual(0);expect(close.y).toBeGreaterThanOrEqual(0);expect(close.x+close.width).toBeLessThanOrEqual(w+1);
  await page.locator('.modal-share').scrollIntoViewIfNeeded();await expect(page.locator('.modal-share')).toBeInViewport();
  if([390,1440].includes(w)) {await page.screenshot({path:`docs/gallery/evidence/${lang}-${w}-modal.png`,fullPage:true});await page.keyboard.press('Escape');await page.screenshot({path:`docs/gallery/evidence/${lang}-${w}-category.png`,fullPage:true});}
 });
}
test('axe WCAG 2.2 AA landing gallery modal both languages',async({page})=>{for(const lang of ['en','ar']){await page.goto(route(lang,'graphic-design'));expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);await open(page,lang);expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);}});
test('reduced motion no gallery transitions',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route('en','graphic-design'));expect(await page.locator('.category-link').first().evaluate(e=>getComputedStyle(e).transitionDuration)).toBe('0s');await open(page);await page.keyboard.press('Escape');await expect(modal(page)).not.toBeVisible();});
test('homepage retains ATHAR and primary collection card',async({page})=>{await page.goto('/');await expect(page.locator('.project-card')).toHaveCount(5);await expect(page.locator('.project-card').first()).toContainText(/أثر|ATHAR/);const link=page.locator('.project-card[href*="graphic-design"]');await expect(link).toHaveCount(1);await page.locator('#work').evaluate(e=>e.scrollIntoView());await link.click();await expect(page).toHaveURL(/work\/graphic-design/);});
