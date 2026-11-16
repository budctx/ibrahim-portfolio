const {test, expect} = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('node:fs/promises');

for (const locale of ['en','ar']) {
  const prefix = locale === 'ar' ? '/ar' : '';
  const home = locale === 'ar' ? '/' : '/en';
  for (const width of [320,390,768,1024,1440,1920]) {
    test(`${locale} ${width}: theme persists through the actual visitor journey`, async ({page}) => {
      await page.setViewportSize({width,height:width<600 ? 844 : 900});
      await page.emulateMedia({reducedMotion:'reduce'});
      for (const theme of ['light','dark']) {
        await page.goto(home+'#work');
        await page.evaluate(value=>localStorage.setItem('portfolio-theme',value), theme);
        await page.reload();
        await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
        const card=page.locator('#project-track .project-card').filter({hasText:locale==='ar'?'بُعد':"BU'D"});
        await card.click();
        await expect(page.locator('#modal-description')).not.toHaveText(/needed to support$/);
        await expect(page.locator('#modal-description')).not.toBeEmpty();
        await page.locator('#modal-link').click();
        await expect(page).toHaveURL(new RegExp(`${prefix}/projects/bud-discord-events$`));
        await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
        await expect(page.locator('.caseSummary')).toBeVisible();
        await expect(page.locator('.portfolioNavigation a').filter({hasText:/Playground|التجارب/})).toHaveCount(0);
        await page.locator('.caseEvidenceNote summary').click();
        await expect(page.locator('.caseEvidenceNote')).toHaveAttribute('open','');
        await page.locator('.portfolioNavigation').getByRole('link',{name:locale==='ar'?'الأعمال':'Work',exact:true}).click();
        await expect(page).toHaveURL(new RegExp(`${home}#work$`));
        await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
        await page.goto(`${prefix}/work/graphic-design`);
        await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
        await expect(page.locator('.category-count')).toHaveCount(4);
        expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
      }
    });
  }
  test(`${locale}: document locale, skip link and legacy Work destination`,async({page})=>{
    await page.goto(`${prefix}/projects/bud-discord-events`);
    await page.locator('.portfolioLanguage').click();
    const target=locale==='ar'?'en':'ar';
    await expect(page.locator('html')).toHaveAttribute('lang',target);
    await expect(page.locator('html')).toHaveAttribute('dir',target==='ar'?'rtl':'ltr');
    await expect(page.locator('.skip')).toHaveText(target==='ar'?'تجاوز إلى المحتوى':'Skip to content');
    await page.goBack();
    await expect(page.locator('html')).toHaveAttribute('lang',locale);
    await page.goto(prefix+'/work');
    await expect(page).toHaveURL(new RegExp(`${home}#work$`));
    await expect(page.locator('#project-track .project-card')).toHaveCount(3);
    await page.goto(prefix+'/playground');
    const contact=page.locator('#'+(locale==='ar'?'experiments-ar':'experiments')+' a').last();
    await expect(contact).toHaveAttribute('href',home+'#contact');
  });
  test(`${locale}: visible modal close and both-theme accessibility`, async({page})=>{
    await page.setViewportSize({width:390,height:844});
    for (const theme of ['light','dark']) {
      await page.goto(prefix+'/work/discord');
      await page.locator('[data-theme-toggle]').click();
      await page.evaluate(t=>localStorage.setItem('portfolio-theme',t),theme);
      await page.reload();
      const card=page.locator('[data-design]').first();
      await card.click();
      const close=page.locator('#modal-close');
      await expect(close).toBeInViewport();
      await expect(close).toHaveAccessibleName(locale==='ar'?'إغلاق':'Close');
      const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      expect(scan.violations).toEqual([]);
      await close.click();
      await expect(page.locator('dialog')).not.toBeVisible();
      await expect(card).toBeFocused();
    }
  });
  test(`${locale}: desktop carousel boundaries survive scroll completion`,async({page})=>{
    await page.setViewportSize({width:1440,height:900});
    await page.goto(home+'#work');
    await expect(page.locator('#project-track .project-card')).toHaveCount(3);
    await expect(page.locator('#project-count')).toHaveText('1–2 / 3');
    await page.locator('#project-next').click();
    await expect(page.locator('#project-next')).toBeDisabled();
    await expect(page.locator('#project-count')).toHaveText('2–3 / 3');
    await page.waitForTimeout(400); // Outlast the former 150ms nearest-card timer.
    await expect(page.locator('#project-next')).toBeDisabled();
    await expect(page.locator('#project-count')).toHaveText('2–3 / 3');
    await page.locator('#project-prev').click();
    await expect(page.locator('#project-prev')).toBeDisabled();
    await expect(page.locator('#project-count')).toHaveText('1–2 / 3');
  });
  test(`${locale}: light scenes and article accessibility and review captures`,async({page})=>{
    await page.setViewportSize({width:1440,height:900});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto(home);
    await page.locator('[data-theme-toggle]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme','light');
    for (const scene of ['main','work','about','contact']) {
      await page.locator(`[data-scene="${scene}"]`).click();
      await expect(page.locator('#'+scene)).toHaveClass(/is-active/);
      expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
      if(scene==='work') await page.screenshot({path:`test-results/audit-evidence/${locale}-work-light.png`});
    }
    await page.goto(prefix+'/projects/bud-discord-events');
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
    await page.screenshot({path:`test-results/audit-evidence/${locale}-case-light.png`});
  });
}

test('lab navigation observations (not field Core Web Vitals)',async({page},testInfo)=>{
  await page.addInitScript(()=>{
    window.auditCLS=0;
    new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.auditCLS+=e.value;}).observe({type:'layout-shift',buffered:true});
  });
  await page.goto('/en');
  await page.locator('#card').waitFor();
  await page.locator('[data-scene="work"]').click();
  await expect(page.locator('#work')).toHaveClass(/is-active/);
  const readings=await page.evaluate(()=>({
    scope:'Single local Chromium navigation; no field INP or device-performance claim',
    navigation:performance.getEntriesByType('navigation').map(e=>({domContentLoaded:e.domContentLoadedEventEnd,load:e.loadEventEnd,transferBytes:e.transferSize})),
    paints:performance.getEntriesByType('paint').map(e=>({name:e.name,startTime:e.startTime})),
    cls:window.auditCLS,
  }));
  const path=testInfo.outputPath('lab-observations.json');
  await fs.writeFile(path,JSON.stringify(readings,null,2));
  await testInfo.attach('local lab observations',{path,contentType:'application/json'});
});
