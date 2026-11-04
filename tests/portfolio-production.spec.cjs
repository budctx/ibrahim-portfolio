// Current-production regression gate (2026-11-04).
// The archived Stage 18 tests target .cv* elements from a superseded homepage.
// This suite tests the shipped full-screen scene system, not development fixtures.
const {test, expect} = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const BASE = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:3000';
const locales = [
  {path: '/', lang: 'ar', dir: 'rtl'},
  {path: '/en', lang: 'en', dir: 'ltr'},
];

async function load(page, path) {
  await page.goto(BASE + path, {waitUntil: 'domcontentloaded'});
  await expect(page.locator('.scene.is-active')).toHaveCount(1);
}

async function noHorizontalOverflow(page) {
  const metrics = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(metrics.document, JSON.stringify(metrics)).toBeLessThanOrEqual(metrics.client + 1);
}

for (const {path, lang, dir} of locales) {
  test(`${lang} root has correct semantics, title, contact and scene navigation`, async ({page}) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await load(page, path);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('html')).toHaveAttribute('dir', dir);
    await expect(page).toHaveTitle(/Digital Product Designer/);
    await expect(page.locator('.scene-dot[data-scene]')).toHaveCount(4);
    await expect(page.locator('#card')).toBeVisible();
    await expect(page.locator('#work')).toHaveCount(1);
    await expect(page.locator('#about')).toHaveCount(1);
    await expect(page.locator('#contact')).toHaveCount(1);
  });

  for (const [width, height] of [[320, 568], [390, 844], [768, 1024], [1440, 900]]) {
    test(`${lang} ${width}x${height} scene reflow and navigation`, async ({page}) => {
      await page.setViewportSize({width, height});
      await page.emulateMedia({reducedMotion: 'reduce'});
      await load(page, path);
      await noHorizontalOverflow(page);
      for (const id of ['work', 'about', 'contact']) {
        await page.locator(`[data-scene="${id}"]`).click();
        await expect(page.locator('#' + id)).toHaveClass(/is-active/);
        await expect(page.locator('.scene.is-active')).toHaveCount(1);
        await noHorizontalOverflow(page);
      }
    });
  }

  test(`${lang} badge toggle is accessible with reduced motion`, async ({page}) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await load(page, path);
    await expect(page.locator('#card')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('.pendulum')).toHaveCSS('animation-name', 'none');
    await page.locator('#card').focus();
    await expect(page.locator('#card')).toBeFocused();
    await page.locator('#card').press('Enter');
    await expect(page.locator('#card')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('#card').press('Enter');
    await expect(page.locator('#card')).toHaveAttribute('aria-pressed', 'false');
  });

  test(`${lang} work items and contact modal remain functional`, async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await page.emulateMedia({reducedMotion: 'reduce'});
    await load(page, path + '#work');
    await expect(page.locator('.project-card')).toHaveCount(2);
    await expect(page.locator('.demo-mark')).toHaveCount(0);
    await page.locator('.project-card').first().click();
    await expect(page.locator('#project-modal')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#project-modal')).not.toBeVisible();

    await page.goto(BASE + path + '#contact');
    await expect(page.locator('#contact')).toHaveClass(/is-active/);
    await page.locator('#envelope-button').click();
    await expect(page.locator('#envelope-button')).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#contact-trigger').click();
    await expect(page.locator('#contact-modal')).toBeVisible();
    await expect(page.locator('.contact-method')).toHaveCount(2);
    await page.keyboard.press('Escape');
    await expect(page.locator('#contact-modal')).not.toBeVisible();
    await expect(page.locator('#contact-trigger')).toBeFocused();
  });

  test(`${lang} work and contact meet serious/critical axe gate`, async ({page}) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    for (const id of ['work', 'contact']) {
      await load(page, path + '#' + id);
      await expect(page.locator('#' + id)).toHaveClass(/is-active/);
      const results = await new AxeBuilder({page})
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const blocking = results.violations.filter(x => ['serious', 'critical'].includes(x.impact));
      expect(blocking.map(x => ({id: x.id, impact: x.impact, nodes: x.nodes.map(n => n.target)}))).toEqual([]);
    }
  });
}

test('legacy Arabic URL canonicalizes to the current Arabic root', async ({page}) => {
  await page.goto(BASE + '/ar', {waitUntil: 'domcontentloaded'});
  await expect(page).toHaveURL(BASE + '/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
});

test('both locale roots expose self-canonical metadata and reciprocal alternates', async ({page}) => {
  for (const {path, lang} of locales) {
    await load(page, path);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', BASE.replace('127.0.0.1:3000', 'ibrahim-portfolio-blush.vercel.app') + (lang === 'en' ? '/en' : '/'));
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
  }
});
