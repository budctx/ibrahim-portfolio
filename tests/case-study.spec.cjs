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
  await expect(media).toHaveCount(4);
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
test('published case study is available from the public Work listing',async({page})=>{
 await page.goto('/work');
 await expect(page).toHaveURL(/en#work$/);
 await expect(page.locator('#project-track .project-card')).toHaveCount(5);
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
  for(const route of ['/about','/playground','/projects/bud-discord-events']) {
   const response=await page.goto(prefix+route);
   expect(response.status()).toBe(200);
   await expect(page.locator('main')).toHaveClass(/cvInteriorPage/);
   const header=page.locator('.portfolioHeader');
   await expect(header).toBeVisible();
   await expect(header.locator('.portfolioWordmark')).toContainText(displayName);
   await expect(header.locator('.portfolioWordmark small')).toHaveText('PORTFOLIO');
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
  await expect(page).toHaveURL(new RegExp(`${home}#work$`));
  await expect(page.locator('#work')).toHaveClass(/is-active/);
 });
}

test('homepage Work grid opens BU\'D directly', async({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/#work');
  await page.locator('[data-scene="work"]').click();
  await expect(page.locator('#work.scene')).toHaveClass(/is-active/);
  const card=page.locator('#project-track .project-card').filter({hasText:'بُعد'});
  await expect(card).toHaveCount(1);
  await expect(card).toHaveAttribute('href','/ar/projects/bud-discord-events');
  await card.click();
  await expect(page).toHaveURL(/\/ar\/projects\/bud-discord-events$/);
  await expect(page.locator('.relatedWork[data-ready="true"]')).toBeVisible();
  await expect(page.locator('.relatedWork .project-card')).toHaveCount(4);
  await page.locator('.projectFooterNav').getByRole('link',{name:'العودة للأعمال',exact:true}).click();
  await expect(page).toHaveURL(/\/#work$/);
});

for(const locale of ['en','ar']) {
 test(`shared related Work carousel has original cards, modal and return navigation: ${locale}`,async({page})=>{
  const prefix=locale==='ar'?'/ar':'';
  await page.setViewportSize({width:390,height:844});
  await page.goto(`${prefix}/projects/bud-discord-events`);
  const section=page.locator('[data-related-work]');
  await expect(section).toHaveAttribute('data-ready','true');
  await expect(section.locator('.project-card')).toHaveCount(4);
  const cards=section.locator('.project-card');
  await cards.first().click();
  const modal=section.locator('dialog.project-modal');
  await expect(modal).toBeVisible();
  await expect(modal.locator('#modal-title')).toContainText(locale==='ar'?'أثر':'ATHAR');
  await expect(modal.locator('#modal-link')).toHaveAttribute('href',locale==='ar'?'/ar/projects/athar':'/projects/athar');
  await modal.locator('#modal-close').click();
  await expect(modal).not.toBeVisible();
  await expect(cards.first()).toBeFocused();
  await cards.nth(1).click();
  await expect(modal).toBeVisible();
  await expect(modal.locator('#modal-link')).toHaveAttribute('href',locale==='ar'?'/ar/work/graphic-design':'/work/graphic-design');
  await modal.locator('#modal-close').click();
  await expect(section.locator('.carousel-count')).not.toBeEmpty();
  const back=page.locator('.projectFooterNav').getByRole('link',{name:locale==='ar'?'العودة للأعمال':'Back to work',exact:true});
  await expect(back).toHaveAttribute('href',locale==='ar'?'/#work':'/en#work');
  await expect(page.locator('.projectFooterNav a')).toHaveCount(2);
  await expect(page.locator('.portfolioNavigation a')).toHaveCount(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 });
}


/* Fluid article layout gate: test intrinsic sizing through breakpoint boundaries,
   not just the three device presets used by the case-study editorial suite. */
for(const locale of ['ar','en'])for(const width of [320,360,430,540,768,850,900,1024,1280,1920]) {
  test(`fluid case-study and related carousel ${locale} ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:width===850?620:width<600?690:900});
    await page.goto(`${locale==='ar'?'/ar':''}/projects/bud-discord-events`);
    await expect(page.locator('main.cvInteriorPage')).toBeVisible();
    const title=page.locator('.caseHeading h1');
    await expect(title).toBeVisible();
    const rail=page.locator('[data-related-work]');
    await expect(rail).toHaveAttribute('data-ready','true');
    await expect(rail.locator('.project-card')).toHaveCount(4);
    const dimensions=await page.evaluate(()=>{
      const bounds=selector=>{
        const r=document.querySelector(selector)?.getBoundingClientRect();
        return r?{left:r.left,right:r.right,width:r.width,height:r.height}:null;
      };
      return {
        documentWidth:document.documentElement.scrollWidth,
        viewWidth:window.innerWidth,
        title:bounds('.caseHeading h1'),
        content:bounds('.caseChapter .caseCopy'),
        media:bounds('.caseEvidence img'),
        related:bounds('.relatedWork .project-track'),
      };
    });
    expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewWidth+1);
    for(const key of ['title','content','media','related']){
      const box=dimensions[key];expect(box,key).not.toBeNull();
      expect(box.left,key).toBeGreaterThanOrEqual(-2);
      expect(box.right,key).toBeLessThanOrEqual(width+2);
      expect(box.width,key).toBeGreaterThan(0);
    }
    const footer=page.locator('.projectFooterNav');
    await expect(footer.getByRole('link',{name:locale==='ar'?'العودة للأعمال':'Back to work'})).toBeVisible();
  });
}

for (const locale of ['ar','en']) for (const width of [320,768,1920]) {
 test(`editorial contracts ${locale} ${width}`, async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto(`${locale==='ar'?'/ar':''}/projects/bud-discord-events`);
  await expect(page.locator('.portfolioNavigation a')).toHaveCount(1);
  await expect(page.locator('.caseLead')).toHaveCount(1);
  await expect(page.locator('#process .caseItems li')).toHaveCount(4);
  await expect(page.locator('#decisions .caseItems li')).toHaveCount(3);
  await expect(page.locator('main')).not.toContainText(/2026|November|نوفمبر|Captured|PORTFOLIO \/ /);
  const actions=page.locator('.projectFooterNav a');
  await expect(actions).toHaveCount(2);
  await expect(actions.nth(1)).toHaveAttribute('target','_blank');
  const boxes=await actions.evaluateAll(items=>items.map(el=>{const r=el.getBoundingClientRect();return {y:r.y,height:r.height,left:r.left,right:r.right,scroll:el.scrollWidth,client:el.clientWidth};}));
  expect(Math.abs(boxes[0].y-boxes[1].y)).toBeLessThan(2);
  expect(Math.abs(boxes[0].height-boxes[1].height)).toBeLessThan(2);
  expect(boxes.every(b=>b.left>=0&&b.right<=width&&b.scroll<=b.client+1)).toBe(true);
  await actions.first().focus();await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp(`${locale==='ar'?'/':'/en'}#work$`));
  await expect(page.locator('#work')).toHaveClass(/is-active/);
 });
}

for(const slug of ['athar','iau-student-app','sky-marathon']) for(const locale of ['ar','en']) for(const width of [320,768,1920]) {
 test(`new work ${slug} ${locale} ${width}`,async({page})=>{
  await page.setViewportSize({width,height:900});
  const prefix=locale==='ar'?'/ar':'';
  await page.goto(`${prefix}/projects/${slug}`);
  await expect(page.locator('.caseHeading h1')).toBeVisible();
  await expect(page.locator('.portfolioNavigation a')).toHaveCount(1);
  await expect(page.locator('.projectFooterNav a')).toHaveCount(slug==='iau-student-app'?1:2);
  await expect(page.locator('#process h2')).not.toHaveText(/host|هوست/);
  await expect(page.locator('[data-related-work]')).toHaveAttribute('data-ready','true');
  await expect(page.locator('[data-related-work] .project-card')).toHaveCount(4);
  for(const img of await page.locator('.caseEvidence img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
    expect((await img.getAttribute('alt')).length).toBeGreaterThan(10);
  }
  for(const theme of ['light','dark']) {
    const current=await page.locator('html').getAttribute('data-theme');
    if(current!==theme)await page.locator('.themeToggle').click();
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  await page.screenshot({path:`test-results/new-work/${slug}-${locale}-${width}.png`,fullPage:true});
 });
}

test('homepage publishes four unique product studies alongside the graphic collection',async({page})=>{
 await page.goto('/#work');
 const cards=page.locator('#project-track .project-card');await expect(cards).toHaveCount(5);
 const feed=await page.request.get('/api/work-projects').then(r=>r.json());
 expect(feed.map(p=>p.id).sort()).toEqual(['athar','bud-discord-events','iau-student-app','sky-marathon']);
 await cards.filter({hasText:'أثر'}).click();
 await expect(page).toHaveURL(/\/ar\/projects\/athar$/);
});
