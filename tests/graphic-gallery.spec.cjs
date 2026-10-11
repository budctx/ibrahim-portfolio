const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
const cats=['discord','brand-identity','social-campaigns','print-packaging'];
const route=(lang,c='discord')=>`${lang==='ar'?'/ar':''}/work/${c}`;
const modal=p=>p.locator('#project-modal');
async function open(p,lang='en'){await p.goto(route(lang));await p.locator('[data-design^="preview-test-"]').click();await expect(modal(p)).toBeVisible();}
async function overflow(p){expect(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();}
for(const lang of ['en','ar']) {
 test(`${lang} four categories landing and publication boundaries`,async({page})=>{
  await page.goto(route(lang,'graphic-design'));await expect(page.locator('.category-link')).toHaveCount(4);
  await expect(page.locator('html')).toHaveAttribute('dir',lang==='ar'?'rtl':'ltr');
  for(const c of cats){await page.goto(route(lang,c));await expect(page.locator('[data-design^="preview-test-"]')).toHaveCount(1);await expect(page.locator('[data-design^="preview-test-"]')).toContainText(lang==='ar'?'اختبار المعاينة':'PREVIEW TEST');await overflow(page);}
  for(const slug of ['unknown','draft-design','hidden-design']) {await page.goto(route(lang)+`?design=${slug}`);await expect(modal(page)).not.toBeVisible();await expect(page).not.toHaveURL(/design=/);await expect(page.locator('#gallery-notice')).toBeVisible();}
 });
 test(`${lang} modal keyboard focus, close and image proportions`,async({page})=>{
  await open(page,lang);await expect(page).toHaveURL(/design=preview-test-discord/);
  expect(await page.locator('body').evaluate(e=>getComputedStyle(e).overflow)).toBe('hidden');
  await expect(page.locator('#modal-art img')).toHaveCount(2);
  expect(await page.locator('#modal-art img').first().evaluate(e=>getComputedStyle(e).objectFit)).toBe('contain');
  await page.locator('#modal-close').focus();await page.keyboard.press('Shift+Tab');await expect(page.locator('.modal-share')).toBeFocused();
  await page.keyboard.press('Tab');await expect(page.locator('#modal-close')).toBeFocused();
  await page.keyboard.press('Escape');await expect(modal(page)).not.toBeVisible();await expect(page).not.toHaveURL(/design=/);await expect(page.locator('[data-design^="preview-test-"]')).toBeFocused();
  await page.locator('[data-design^="preview-test-"]').click();await page.locator('#modal-close').click();await expect(page).not.toHaveURL(/design=/);
 });
 test(`${lang} deep link reload history and direct close`,async({page})=>{
  await page.goto(route(lang)+ '?design=preview-test-discord');await expect(modal(page)).toBeVisible();await page.reload();await expect(modal(page)).toBeVisible();
  await page.locator('#modal-close').click();await expect(page).toHaveURL(new RegExp(route(lang)+'$'));
  await page.locator('[data-design^="preview-test-"]').click();await page.goBack();await expect(modal(page)).not.toBeVisible();await page.goForward();await expect(modal(page)).toBeVisible();
  await page.locator('#modal-close').click();await expect(page).not.toHaveURL(/design=/);await page.locator('[data-design^="preview-test-"]').click();await expect(modal(page)).toBeVisible();await expect(page).toHaveURL(/design=/);
 });
 test(`${lang} selected design preserved by language link`,async({page})=>{
  await open(page,lang);const href=await page.locator('#gallery-language').getAttribute('href');expect(href).toContain('design=preview-test-discord');
  await page.locator('#modal-language').click();await expect(modal(page)).toBeVisible();await expect(page.locator('html')).toHaveAttribute('lang',lang==='ar'?'en':'ar');
 });
}
for(const [w,h] of [[320,568],[375,812],[390,844],[768,1024],[1440,900],[1920,1080],[844,390]])for(const lang of ['en','ar']) {
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

// Exercise rapid native close/history events without waiting for animation.
test('rapid close and reopen does not orphan a modal or scroll lock',async({page})=>{
 await open(page);
 for(let i=0;i<5;i++){
  await page.locator('#modal-close').click();
  await page.locator('[data-design^="preview-test-"]').click();
  await expect(modal(page)).toBeVisible();await expect(page).toHaveURL(/design=/);
 }
 await page.keyboard.press('Escape');await expect(modal(page)).not.toBeVisible();await expect(page).not.toHaveURL(/design=/);
 expect(await page.locator('body').evaluate(e=>e.style.overflow)).toBe('');
});
test.describe('touch interactions',()=>{
 test.use({hasTouch:true,viewport:{width:390,height:844}});
 test('tap category and card then close',async({page})=>{
  await page.goto(route('ar','graphic-design'));await page.locator('.category-link').first().tap();await page.locator('[data-design^="preview-test-"]').tap();await expect(modal(page)).toBeVisible();await page.locator('#modal-close').tap();await expect(modal(page)).not.toBeVisible();
 });
});
test('light system preference retains approved dark-only design',async({page})=>{
 await page.emulateMedia({colorScheme:'light'});await page.goto(route('en','graphic-design'));
 expect(await page.locator('html').evaluate(e=>getComputedStyle(e).colorScheme)).toBe('dark');
});
for(const lang of ['en','ar']) test(`${lang} floating landing fits and interactive tilt works`,async({page})=>{
 for(const [width,height] of [[320,568],[390,844],[768,1024],[1440,900],[844,390]]){
  await page.setViewportSize({width,height});await page.goto(route(lang,'graphic-design'));
  const object=page.locator('.floating-design');await expect(object).toBeVisible();await overflow(page);
  const bounds=await object.boundingBox();
  for(const link of await page.locator('.category-link').all()){
   await expect(link).toBeInViewport();const b=await link.boundingBox();
   expect(b.x+b.width<=bounds.x || b.x>=bounds.x+bounds.width || b.y+b.height<=bounds.y || b.y>=bounds.y+bounds.height).toBeTruthy();
  }
  await object.focus();const before=await object.evaluate(e=>e.style.getPropertyValue('--rotate-y'));
  await page.keyboard.press('ArrowRight');expect(await object.evaluate(e=>e.style.getPropertyValue('--rotate-y'))).not.toBe(before);
  if(width===390||width===1440)await page.screenshot({path:`docs/gallery/evidence/${lang}-${width}-floating.png`,fullPage:true});
 }
 await page.emulateMedia({reducedMotion:'reduce'});expect(await page.locator('.design-stack').evaluate(e=>getComputedStyle(e).animationName)).toBe('none');
});
test('floating object pointer drag and gallery three-column grid',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto(route('en','graphic-design'));
 const object=page.locator('.floating-design');await object.hover();const b=await object.boundingBox();
 await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down();await page.mouse.move(b.x+b.width/2+60,b.y+b.height/2+30,{steps:6});await page.mouse.up();
 expect(await object.evaluate(e=>e.style.getPropertyValue('--rotate-y'))).not.toBe('-16deg');
 await page.goto(route('en'));expect(await page.locator('.gallery-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length)).toBe(3);
 await page.setViewportSize({width:768,height:1024});expect(await page.locator('.gallery-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length)).toBe(2);
 await page.setViewportSize({width:390,height:844});expect(await page.locator('.gallery-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length)).toBe(1);
});

test('Rais broadcast banners publish as three separate designs',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto(route('ar'));
 const slugs=['rais-rocket-league','rais-brawlhalla','rais-call-of-duty'];
 for(const slug of slugs){
  const card=page.locator(`[data-design="${slug}"]`);await expect(card).toBeVisible();
  await card.click();await expect(modal(page)).toBeVisible();await expect(page.locator('#modal-description')).toContainText('بنر برودكاست');await expect(page.locator('.modal-copy')).toContainText('Rais');
  await expect(page.locator('#modal-art img')).toHaveCount(1);
  expect(await page.locator('#modal-art img').evaluate(e=>e.complete&&e.naturalWidth===1920&&e.naturalHeight===700)).toBeTruthy();
  await page.keyboard.press('Escape');
 }
 await page.screenshot({path:'docs/gallery/evidence/rais-three-banners.png',fullPage:true});
});

test('deployed gallery functions include the published CMS files',()=>{
 const fs=require('node:fs');
 for(const prefix of ['work','ar/work']){
  const trace=JSON.parse(fs.readFileSync(`.next/server/app/${prefix}/[gallery]/route.js.nft.json`,'utf8'));
  for(const slug of ['rais-rocket-league','rais-brawlhalla','rais-call-of-duty'])expect(trace.files.some(p=>p.endsWith(`content/graphic-designs/${slug}.yaml`))).toBeTruthy();
 }
});
