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
  await page.locator('#gallery-language').focus();await page.keyboard.press('Shift+Tab');await expect(page.locator('.modal-share')).toBeFocused();
  await page.keyboard.press('Tab');await expect(page.locator('#gallery-language')).toBeFocused();
  await page.keyboard.press('Escape');await expect(modal(page)).not.toBeVisible();await expect(page).not.toHaveURL(/design=/);await expect(page.locator('[data-design^="preview-test-"]')).toBeFocused();
  await page.locator('[data-design^="preview-test-"]').click();await page.keyboard.press('Escape');await expect(page).not.toHaveURL(/design=/);
 });
 test(`${lang} deep link reload history and direct close`,async({page})=>{
  await page.goto(route(lang)+ '?design=preview-test-discord');await expect(modal(page)).toBeVisible();await page.reload();await expect(modal(page)).toBeVisible();
  await page.keyboard.press('Escape');await expect(page).toHaveURL(new RegExp(route(lang)+'$'));
  await page.locator('[data-design^="preview-test-"]').click();await page.goBack();await expect(modal(page)).not.toBeVisible();await page.goForward();await expect(modal(page)).toBeVisible();
  await page.keyboard.press('Escape');await expect(page).not.toHaveURL(/design=/);await page.locator('[data-design^="preview-test-"]').click();await expect(modal(page)).toBeVisible();await expect(page).toHaveURL(/design=/);
 });
 test(`${lang} selected design preserved by language link`,async({page})=>{
  await open(page,lang);const href=await page.locator('#gallery-language').getAttribute('href');expect(href).toContain('design=preview-test-discord');
  await page.locator('#gallery-language').click();await expect(modal(page)).toBeVisible();await expect(page.locator('html')).toHaveAttribute('lang',lang==='ar'?'en':'ar');
 });
}
for(const [w,h] of [[320,568],[375,812],[390,844],[768,1024],[1440,900],[1920,1080],[844,390]])for(const lang of ['en','ar']) {
 test(`${lang} responsive ${w}x${h}`,async({page})=>{
  await page.setViewportSize({width:w,height:h});await page.goto(route(lang,'graphic-design'));await overflow(page);await expect(page.locator('.category-link')).toHaveCount(4);
  await open(page,lang);await overflow(page);
  const close=await page.locator('#gallery-language').boundingBox();expect(close.x).toBeGreaterThanOrEqual(0);expect(close.y).toBeGreaterThanOrEqual(0);expect(close.x+close.width).toBeLessThanOrEqual(w+1);
  await page.locator('.modal-share').scrollIntoViewIfNeeded();await expect(page.locator('.modal-share')).toBeInViewport();
  if([390,1440].includes(w)) {await page.screenshot({path:`docs/gallery/evidence/${lang}-${w}-modal.png`,fullPage:true});await page.keyboard.press('Escape');await page.screenshot({path:`docs/gallery/evidence/${lang}-${w}-category.png`,fullPage:true});}
 });
}
test('axe WCAG 2.2 AA landing gallery modal both languages',async({page})=>{for(const lang of ['en','ar']){await page.goto(route(lang,'graphic-design'));expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);await open(page,lang);expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);}});
test('reduced motion no gallery transitions',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route('en','graphic-design'));expect(await page.locator('.category-link').first().evaluate(e=>getComputedStyle(e).transitionDuration)).toBe('0s');await open(page);await page.keyboard.press('Escape');await expect(modal(page)).not.toBeVisible();});
test('homepage retains ATHAR and primary collection card',async({page})=>{await page.goto('/');await expect(page.locator('.project-card')).toHaveCount(2);await expect(page.locator('.project-card').first()).toContainText(/أثر|ATHAR/);const link=page.locator('.project-card[href*="graphic-design"]');await expect(link).toHaveCount(1);await page.locator('#work').evaluate(e=>e.scrollIntoView());await link.click();await expect(page).toHaveURL(/work\/graphic-design/);});

// Exercise rapid native close/history events without waiting for animation.
test('rapid close and reopen does not orphan a modal or scroll lock',async({page})=>{
 await open(page);
 for(let i=0;i<5;i++){
  await page.keyboard.press('Escape');
  await page.locator('[data-design^="preview-test-"]').click();
  await expect(modal(page)).toBeVisible();await expect(page).toHaveURL(/design=/);
 }
 await page.keyboard.press('Escape');await expect(modal(page)).not.toBeVisible();await expect(page).not.toHaveURL(/design=/);
 expect(await page.locator('body').evaluate(e=>e.style.overflow)).toBe('');
});
test.describe('touch interactions',()=>{
 test.use({hasTouch:true,viewport:{width:390,height:844}});
 test('tap category and card then close',async({page})=>{
  await page.goto(route('ar','graphic-design'));await page.locator('.category-link').first().tap();await page.locator('[data-design^="preview-test-"]').tap();await expect(modal(page)).toBeVisible();await page.locator('#project-modal').tap({position:{x:10,y:10}});await expect(modal(page)).not.toBeVisible();
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
  await card.click();await expect(modal(page)).toBeVisible();await expect(page.locator('#modal-description')).toContainText('إعلان بطولة');await expect(page.locator('.modal-copy')).toContainText('Rais');
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

test('media-first modal compact mobile controls and server attribution',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto(route('ar')+'?design=rais-rocket-league');
 await expect(modal(page)).toBeVisible();await expect(page.locator('#modal-close')).toHaveCount(0);
 await expect(page.locator('#gallery-language')).toBeInViewport();await expect(page.locator('.modal-copy #gallery-language')).toHaveCount(0);
 await expect(page.locator('.modal-share')).toHaveAccessibleName('نسخ رابط التصميم');await expect(page.locator('.modal-share')).toHaveText('');
 await expect(page.locator('#modal-category')).toHaveText('ديسكورد');await expect(page.locator('#modal-entity')).toContainText('سيرفر Rais');
 await expect(page.locator('#modal-entity img')).toBeVisible();
 expect(await page.locator('#modal-entity img').evaluate(e=>e.complete&&e.naturalWidth>0)).toBeTruthy();
 const copy=await page.locator('.modal-copy').boundingBox();expect(copy.height).toBeLessThan(190);
 const image=await page.locator('#modal-art img').boundingBox(),language=await page.locator('#gallery-language').boundingBox();expect(language.y+language.height).toBeLessThan(image.y);
 await page.screenshot({path:'docs/gallery/evidence/rais-compact-mobile.png',fullPage:true});
 await page.locator('#project-modal').click({position:{x:10,y:10}});await expect(modal(page)).not.toBeVisible();await expect(page).not.toHaveURL(/design=/);
});

for(const lang of ['ar','en']) for(const [width,height] of [[320,568],[390,844],[768,1024],[1440,900],[1920,1080],[844,390]]){
 test(`${lang} homepage polished scenes fit ${width}x${height}`,async({page})=>{
  await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'reduce'});
  const home=lang==='ar'?'/':'/en';const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const id of ['work','about','contact']){
   await page.goto(home+'#'+id);await expect(page.locator('#'+id)).toHaveClass(/is-active/);
   await expect(page.locator('.scene.is-active')).toHaveCount(1);await overflow(page);
   const selectors=id==='work'?['.work-header','.project-card','.work-footer']:id==='about'?['.about-header','.about-copy','.cube-control','.cube-controls','.cube-orbit','.cube-skills','.about-footer']:['.contact-header','.contact-copy','.envelope-button','.envelope-hint','.contact-footer'];
   for(const selector of selectors){
    const items=page.locator('#'+id+' '+selector);const first=items.first();await expect(first).toBeVisible();
    const box=await first.boundingBox();expect(box.y,selector).toBeGreaterThanOrEqual(-1);expect(box.y+box.height,selector).toBeLessThanOrEqual(height+1);
    if(selector!=='.project-card'){expect(box.x,selector).toBeGreaterThanOrEqual(-1);expect(box.x+box.width,selector).toBeLessThanOrEqual(width+1);}
   }
   if(id==='work'){
    await expect(page.locator('.project-card')).toHaveCount(2);await expect(page.locator('.demo-mark')).toHaveCount(0);
    if(width>=900)for(const c of await page.locator('.project-card').all())await expect(c).toBeInViewport({ratio:1});
   }
   if(id==='about'){await expect(page.locator('.cube-dot')).toHaveCount(3);await page.locator('[data-cube="1"]').click();await expect(page.locator('[data-cube="1"]')).toHaveAttribute('aria-pressed','true');}
   if([390,1440].includes(width))await page.screenshot({path:`docs/gallery/evidence/home-${lang}-${width}-${id}.png`});
  }
  expect(errors).toEqual([]);
 });
}
for(const lang of ['ar','en'])test(`${lang} homepage real work and contact interaction regressions`,async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});const home=lang==='ar'?'/':'/en';
 await page.goto(home+'#work');await expect(page.locator('#work')).toHaveClass(/is-active/);await page.locator('.project-card').first().click();await expect(modal(page)).toBeVisible();await expect(page.locator('#modal-title')).toHaveText(lang==='ar'?'أثر':'ATHAR');await page.keyboard.press('Escape');await expect(modal(page)).not.toBeVisible();
 await page.locator('#project-next').click();await expect(page.locator('#project-count')).toHaveText(lang==='ar'?'تصميم جرافيكي':'Graphic Design');await page.locator('.project-card[href*="graphic-design"]').click();await expect(page).toHaveURL(/work\/graphic-design/);
 await page.goto(home+'#contact');await expect(page.locator('#contact')).toHaveClass(/is-active/);await page.locator('#envelope-button').click();await expect(page.locator('#envelope-button')).toHaveAttribute('aria-expanded','true');
 await page.locator('#contact-trigger').click();await expect(page.locator('#contact-modal')).toBeVisible();expect(await page.locator('#scenes').evaluate(e=>e.style.overflow)).toBe('hidden');
 await expect(page.locator('.contact-method')).toHaveCount(2);await page.locator('#contact-modal-close').focus();await page.keyboard.press('Shift+Tab');await expect(page.locator('#contact-whatsapp')).toBeFocused();await page.keyboard.press('Escape');await expect(page.locator('#contact-trigger')).toBeFocused();expect(await page.locator('#scenes').evaluate(e=>e.style.overflow)).toBe('');
 for(const id of ['work','about','contact']){
  await page.goto(home+'#'+id);await expect(page.locator('#'+id)).toHaveClass(/is-active/);
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 }
});
test('Hero interaction and section navigation preserved',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await expect(page.locator('#card')).toHaveAttribute('aria-pressed','false');await page.locator('#card').click();await expect(page.locator('#card')).toHaveAttribute('aria-pressed','true');await page.locator('#card').click();await expect(page.locator('#card')).toHaveAttribute('aria-pressed','false');
 for(const id of ['work','about','contact','main']){await page.locator(`[data-scene="${id}"]`).click();await expect(page.locator('#'+id)).toHaveClass(/is-active/);await expect(page.locator('.scene.is-active')).toHaveCount(1);}
});

for(const lang of ['ar','en'])test(`${lang} mobile horizontal work swipe then vertical exit`,async({page})=>{
 await page.setViewportSize({width:390,height:844});
 const touch=await page.context().newCDPSession(page);
 await touch.send('Emulation.setTouchEmulationEnabled',{enabled:true});
 const home=lang==='ar'?'/':'/en';await page.goto(home+'#work');
 await expect(page.locator('#work')).toHaveClass(/is-active/);
 const swipe=async(x,y,dx,dy)=>{
  await touch.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
  for(let i=1;i<=12;i++){
   await touch.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/12,y:y+dy*i/12}]});
   await page.waitForTimeout(20);
  }
  await touch.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 };
 const card=await page.locator('.project-card').first().boundingBox();
 await swipe(320,card.y+80,-245,0);
 await expect(page.locator('#project-count')).toHaveText(lang==='ar'?'تصميم جرافيكي':'Graphic Design');
 // Exercise dynamic viewport height changes with the second card selected.
 await page.setViewportSize({width:390,height:780});
 await swipe(195,570,0,-450);
 await expect(page.locator('#about')).toHaveClass(/is-active/);
 await expect.poll(()=>page.locator('#scenes').evaluate(e=>e.scrollTop)).toBeGreaterThan(1400);
 await page.waitForTimeout(1200);
 await expect(page.locator('#about')).toHaveClass(/is-active/);
 await swipe(195,570,0,-450);await expect(page.locator('#contact')).toHaveClass(/is-active/);
 // Return and test wheel chaining over the selected card too.
 await page.locator('[data-scene="work"]').click();await expect(page.locator('#work')).toHaveClass(/is-active/);
 await expect.poll(()=>page.locator('#scenes').evaluate(e=>Math.round(e.scrollTop))).toBe(780);
 await expect(page.locator('#project-count')).toHaveText(lang==='ar'?'تصميم جرافيكي':'Graphic Design');
 const selected=await page.locator('.project-card').last().boundingBox();await page.mouse.move(195,selected.y+80);await page.mouse.wheel(0,700);
 await expect(page.locator('#about')).toHaveClass(/is-active/);
});

for(const lang of ['ar','en'])test(`${lang} four floating skills follow cube selection and allow vertical scrolling`,async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto((lang==='ar'?'/':'/en')+'#about');await expect(page.locator('#about')).toHaveClass(/is-active/);
 const sets=[['UI/UX','Wireframing','Prototyping','Design Systems'],['Photoshop','Illustrator','InDesign','After Effects'],['AI Workflows','Prompt Design','Tool Integration','AI Automation']];
 for(let i=0;i<3;i++){
  await page.locator(`[data-cube="${i}"]`).click();await expect(page.locator('.cube-skills li')).toHaveText(sets[i]);await expect(page.locator('#cube-status')).toContainText(sets[i][3]);
  for(const badge of await page.locator('.cube-skills li').all())await expect(badge).toBeInViewport({ratio:1});
 }
 await page.locator('[data-cube="0"]').click();await page.locator('[data-cube="2"]').click();await page.locator('[data-cube="1"]').click();await expect(page.locator('.cube-skills li')).toHaveText(sets[1]);
 await expect.poll(()=>page.locator('.about-cube,.cube-skills li').evaluateAll(items=>items.some(e=>e.getAnimations().some(a=>a.playState==='running')))).toBe(false);
 await page.screenshot({path:`docs/gallery/evidence/skills-${lang}-390.png`});
 await page.emulateMedia({reducedMotion:'reduce'});expect(await page.locator('.cube-skills span').first().evaluate(e=>getComputedStyle(e).animationName)).toBe('none');
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 const badge=await page.locator('.cube-skills li').first().boundingBox();await page.mouse.move(badge.x+badge.width/2,badge.y+badge.height/2);await page.mouse.wheel(0,800);await expect(page.locator('#contact')).toHaveClass(/is-active/);
});

for(const lang of ['ar','en'])test(`${lang} section URL follows scroll navigation reload and history`,async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});const home=lang==='ar'?'/':'/en';
 await page.goto(home+'#work');await expect(page.locator('#work')).toHaveClass(/is-active/);
 await page.mouse.move(190,400);await page.mouse.wheel(0,800);await expect(page).toHaveURL(/#about$/);await expect(page.locator('#about')).toHaveClass(/is-active/);
 await page.reload();await expect(page.locator('#about')).toHaveClass(/is-active/);
 await page.locator('[data-scene="contact"]').click();await expect(page).toHaveURL(/#contact$/);await expect(page.locator('#contact')).toHaveClass(/is-active/);
 await page.goBack();await expect(page).toHaveURL(/#about$/);await expect(page.locator('#about')).toHaveClass(/is-active/);
 await page.goForward();await expect(page).toHaveURL(/#contact$/);await expect(page.locator('#contact')).toHaveClass(/is-active/);
 await page.reload();await expect(page.locator('#contact')).toHaveClass(/is-active/);
 await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('[data-scene="main"]').click();await expect(page).toHaveURL(/#main$/);await expect(page.locator('#main')).toHaveClass(/is-active/);
 await expect.poll(()=>page.locator('#scenes').evaluate(e=>Math.round(e.scrollTop))).toBe(0);await expect(page).toHaveURL(/#main$/);
});
for(const lang of ['ar','en'])test(`${lang} badge exit synchronized replacement tool symbols rapid cancel`,async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto((lang==='ar'?'/':'/en')+'#about');await expect(page.locator('#about')).toHaveClass(/is-active/);
 await page.locator('[data-cube="1"]').click();await expect(page.locator('#cube-skills')).toHaveAttribute('data-phase','leaving');await expect(page.locator('#cube-skills')).toHaveAttribute('aria-hidden','true');
 await expect(page.locator('.cube-skills li')).toHaveText(['Photoshop','Illustrator','InDesign','After Effects']);await expect(page.locator('#cube-skills')).toHaveAttribute('data-phase','ready');
 expect(await page.locator('.cube-skills span').evaluateAll(items=>items.map(e=>e.dataset.tool))).toEqual(['Ps','Ai','Id','Ae']);
 await page.locator('[data-cube="2"]').click();await page.locator('[data-cube="0"]').click();await page.locator('[data-cube="1"]').click();await expect(page.locator('.cube-skills li')).toHaveText(['Photoshop','Illustrator','InDesign','After Effects']);
 await page.locator('[data-cube="2"]').click();await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('#cube-skills')).toHaveAttribute('data-phase','ready');await expect(page.locator('.cube-skills li')).toHaveText(['AI Workflows','Prompt Design','Tool Integration','AI Automation']);
 await expect(page.locator('.cube-skills span[data-tool]')).toHaveCount(0);await expect(page.locator('#cube-skills')).not.toHaveAttribute('aria-hidden','true');
 await page.waitForTimeout(600);await expect(page.locator('.cube-skills li')).toHaveText(['AI Workflows','Prompt Design','Tool Integration','AI Automation']);
});
