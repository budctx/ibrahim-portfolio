const {test, expect} = require('@playwright/test');

const BASE = 'http://127.0.0.1:3000';
const locales = [
  {path: '/', lang: 'ar', dir: 'rtl', switchHref: '/en'},
  {path: '/en', lang: 'en', dir: 'ltr', switchHref: '/'},
];

async function noDocumentOverflow(page) {
  const d = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(d.document, JSON.stringify(d)).toBeLessThanOrEqual(d.viewport + 1);
}

test.describe('Rebuild v2 / authored experience acceptance', () => {
  for (const {path, lang, dir, switchHref} of locales) {
    test(`semantic, truthful homepage: ${path}`, async ({page}) => {
      await page.goto(BASE + path, {waitUntil: 'networkidle'});
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('html')).toHaveAttribute('dir', dir);
      await expect(page.locator('main.xp')).toBeVisible();
      await expect(page.locator('main h1')).toHaveCount(1);
      for (const id of ['approach', 'journey', 'capabilities', 'credentials', 'work', 'contact']) {
        await expect(page.locator('#' + id)).toHaveCount(1);
      }
      await expect(page.locator(`header a[href="${switchHref}"]`)).toBeVisible();
      await expect(page.locator('.xpConsoleTabs button')).toHaveCount(3);
      await expect(page.locator('.xpEmptyWork')).toBeVisible();
      await expect(page.locator('.xpProjectGrid .projectCard')).toHaveCount(0);
      await expect(page.locator('.cvSectionNext')).toHaveCount(0);
    });

    for (const width of [320, 390, 768, 1024, 1440]) {
      test(`safe space and reflow ${path} at ${width}px`, async ({page}) => {
        await page.setViewportSize({width, height: 850});
        await page.goto(BASE + path, {waitUntil: 'networkidle'});
        await noDocumentOverflow(page);
        const boxes = await page.evaluate(() => {
          const parent = document.querySelector('.xpHero');
          const copy = document.querySelector('.xpHeroCopy');
          const consoleElement = document.querySelector('.xpConsole');
          const shell = document.querySelector('.xpShell');
          return [parent,copy,consoleElement,shell].map(x => {
            const r = x.getBoundingClientRect();
            return {left: r.left, right: r.right, width:r.width};
          });
        });
        for (const r of boxes) {
          expect(r.left).toBeGreaterThanOrEqual(-1);
          expect(r.right).toBeLessThanOrEqual(width + 1);
        }
        const undersized = await page.locator('header a, header button, .xpConsoleTabs button, .xpFloatingContact').evaluateAll(nodes =>
          nodes.filter(el => {
            const css = getComputedStyle(el);return css.visibility !== 'hidden' && css.display !== 'none';
          }).map(el => {
            const r=el.getBoundingClientRect();return {text:el.textContent,width:r.width,height:r.height};
          }).filter(r => r.width < 44 || r.height < 44)
        );
        expect(undersized).toEqual([]);
      });
    }

    test(`200% text resize ${path}`, async ({page}) => {
      await page.setViewportSize({width: 1280, height: 900});
      await page.goto(BASE + path, {waitUntil: 'networkidle'});
      await page.addStyleTag({content:'html { font-size: 200% !important; }'});
      await noDocumentOverflow(page);
      await expect(page.locator('.xpConsoleTabs')).toBeVisible();
      await expect(page.locator('#contact')).toBeAttached();
    });

    test(`repeatable contact link ${path}`, async ({page}) => {
      await page.setViewportSize({width: 1280, height: 900});
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.goto(BASE + path, {waitUntil:'networkidle'});
      const control = page.locator('.xpFloatingContact');
      await control.click();
      await expect(page).toHaveURL(/#contact$/);
      // Near the end of the document, max scroll can leave the section below the sticky-header offset.
      // Verify the section enters the visible top portion instead of demanding impossible exact alignment.
      const firstContactTop = await page.locator('#contact').evaluate(el => el.getBoundingClientRect().top);
      expect(firstContactTop).toBeGreaterThanOrEqual(0);
      expect(firstContactTop).toBeLessThan(300);
      await page.evaluate(()=>scrollTo(0,0));
      await expect.poll(()=>page.evaluate(()=>scrollY)).toBeLessThan(10);
      await control.click();
      // Near the end of the document, max scroll can leave the section below the sticky-header offset.
      // Verify the section enters the visible top portion instead of demanding impossible exact alignment.
      const secondContactTop = await page.locator('#contact').evaluate(el => el.getBoundingClientRect().top);
      expect(secondContactTop).toBeGreaterThanOrEqual(0);
      expect(secondContactTop).toBeLessThan(300);
    });
  }

  test('stage model advances at eight seconds then respects manual choice', async ({page}) => {
    await page.setViewportSize({width:1440,height:1000});
    await page.goto(BASE + '/en', {waitUntil:'networkidle'});
    const tabs=page.locator('.xpConsoleTabs button');
    await expect(tabs.nth(0)).toHaveAttribute('aria-pressed','true');
    const before = await page.locator('.xpConsoleDetail').boundingBox();
    await page.waitForTimeout(8300);
    await expect(tabs.nth(1)).toHaveAttribute('aria-pressed','true');
    const after=await page.locator('.xpConsoleDetail').boundingBox();
    expect(Math.abs(before.height-after.height)).toBeLessThanOrEqual(1);
    await tabs.nth(2).click();
    await expect(tabs.nth(2)).toHaveAttribute('aria-pressed','true');
    await page.waitForTimeout(8300);
    await expect(tabs.nth(2)).toHaveAttribute('aria-pressed','true');
  });

  test('reduced motion disables automatic advance but preserves interaction', async ({browser}) => {
    const context=await browser.newContext({reducedMotion:'reduce',viewport:{width:1280,height:900}});
    const page=await context.newPage();
    await page.goto(BASE+'/',{waitUntil:'networkidle'});
    await expect(page.locator('.xpConsoleFoot')).toContainText('MOTION REDUCED');
    const duration=await page.locator('.xpPrimaryLink').first().evaluate(el=>getComputedStyle(el).transitionDuration);
    expect(Math.max(...duration.split(',').map(v=>v.includes('ms')?parseFloat(v):parseFloat(v)*1000))).toBeLessThanOrEqual(0.1);
    await page.locator('.xpConsoleTabs button').nth(1).click();
    await expect(page.locator('.xpConsoleTabs button').nth(1)).toHaveAttribute('aria-pressed','true');
    await context.close();
  });

  test('default dark and persisted manual theme', async ({page}) => {
    await page.goto(BASE+'/',{waitUntil:'networkidle'});
    await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
    await page.locator('header button.themeToggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme','light');
    await page.reload({waitUntil:'networkidle'});
    await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  });

  test('language switch preserves authored RTL/LTR semantics', async ({page}) => {
    await page.goto(BASE+'/',{waitUntil:'networkidle'});
    await page.locator('header a[href="/en"]').click();
    await expect(page).toHaveURL(BASE+'/en');
    await expect(page.locator('html')).toHaveAttribute('lang','en');
    await expect(page.locator('html')).toHaveAttribute('dir','ltr');
    await page.locator('header .xpLanguage').click();
    await expect(page.locator('html')).toHaveAttribute('lang','ar');
    await expect(page.locator('html')).toHaveAttribute('dir','rtl');
  });


  test('verified CV facts are consistent in both authored languages', async ({page}) => {
    for(const route of ['/', '/en']){
      await page.goto(BASE+route,{waitUntil:'networkidle'});
      const journey = page.locator('#journey');
      await expect(journey).toContainText('04/2025—08/2025');
      await expect(journey).toContainText('09/2019—10/2024');
      await expect(page.locator('#credentials')).toContainText('Google UX Design Professional Certificate');
      await expect(page.locator('#credentials')).toContainText('Google AI Professional Certificate');
      await expect(journey).toContainText(route === '/' ? 'مستشفى الدكتور سليمان الحبيب' : 'Dr. Sulaiman Al Habib Hospital');
    }
  });

  test('mobile header keeps contact reachable while floating dock yields to the interactive panel', async ({page}) => {
    await page.setViewportSize({width:390,height:900});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto(BASE+'/',{waitUntil:'networkidle'});
    await expect(page.locator('.xpHeaderContact')).toBeVisible();
    await expect(page.locator('.xpFloatingContact')).toBeHidden();
    await page.locator('#credentials').scrollIntoViewIfNeeded();
    await expect(page.locator('.xpFloatingContact')).toBeVisible();
  });

  test('legacy Arabic home redirects to Arabic canonical',async ({page})=>{
    await page.goto(BASE+'/ar',{waitUntil:'networkidle'});
    await expect(page).toHaveURL(BASE+'/');
    await expect(page.locator('html')).toHaveAttribute('lang','ar');
  });
});
