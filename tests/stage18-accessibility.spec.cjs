const {test, expect} = require('@playwright/test');

const BASE = 'http://127.0.0.1:3000';
const routes = ['/', '/work', '/playground', '/about', '/ar', '/ar/work', '/ar/playground', '/ar/about'];

async function expectNoHorizontalOverflow(page) {
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
  return metrics;
}

async function expectCoreContentVisible(page) {
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('h1').first()).toBeVisible();

  const clipped = await page.locator('header a, header button').evaluateAll((elements) => {
    const width = window.innerWidth;
    return elements
      .filter((element) => {
        const style = getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden';
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          text: (element.textContent || '').trim(),
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height,
        };
      })
      .filter((item) => item.left < -1 || item.right > width + 1);
  });

  expect(clipped).toEqual([]);
}

test.describe('Interactive CV accessibility and responsive evidence', () => {
  test('320px reflow preserves all key routes without horizontal overflow', async ({page}) => {
    await page.setViewportSize({width: 320, height: 800});

    for (const route of routes) {
      await page.goto(`${BASE}${route}`, {waitUntil: 'networkidle'});

      expect(await page.evaluate(() => window.innerWidth)).toBe(320);
      await expectNoHorizontalOverflow(page);
      await expectCoreContentVisible(page);

      if (route === '/' || route === '/ar') {
        await expect(page.locator('.cvMapGrid')).toBeVisible();
        await expect(page.locator('.cvSignal')).toHaveCount(5);
      }

      if (route.startsWith('/ar')) {
        await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
        await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      } else {
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
      }
    }
  });

  test('interactive controls retain the 44px authored target guardrail at 320px', async ({page}) => {
    await page.setViewportSize({width: 320, height: 800});
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle'});

    const undersized = await page.locator('header a, header button, .cvSignal').evaluateAll((elements) =>
      elements
        .filter((element) => {
          const style = getComputedStyle(element);
          return style.display !== 'none' && style.visibility !== 'hidden';
        })
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            text: (element.textContent || '').trim(),
            width: rect.width,
            height: rect.height,
          };
        })
        .filter((item) => item.width < 44 || item.height < 44),
    );

    expect(undersized).toEqual([]);
  });

  test('200% text resize keeps content usable without horizontal overflow', async ({page}) => {
    await page.setViewportSize({width: 1280, height: 900});

    for (const route of routes) {
      await page.goto(`${BASE}${route}`, {waitUntil: 'networkidle'});
      await page.addStyleTag({content: 'html { font-size: 200% !important; }'});

      const rootFontSize = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
      expect(parseFloat(rootFontSize)).toBeGreaterThanOrEqual(31);

      await expectNoHorizontalOverflow(page);
      await expectCoreContentVisible(page);
    }
  });

  test('Reduced Motion collapses authored transitions and preserves navigation', async ({browser}) => {
    const context = await browser.newContext({
      reducedMotion: 'reduce',
      viewport: {width: 1280, height: 900},
    });
    const page = await context.newPage();

    await page.goto(`${BASE}/`, {waitUntil: 'networkidle'});

    expect(await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);

    const motion = await page.locator('.cvButton').first().evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        transitionDuration: style.transitionDuration,
        animationDuration: style.animationDuration,
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      };
    });

    const maxTransitionMs = Math.max(
      ...motion.transitionDuration.split(',').map((value) => {
        const trimmed = value.trim();
        if (trimmed.endsWith('ms')) return parseFloat(trimmed);
        if (trimmed.endsWith('s')) return parseFloat(trimmed) * 1000;
        return Number.POSITIVE_INFINITY;
      }),
    );

    expect(maxTransitionMs).toBeLessThanOrEqual(0.1);
    expect(motion.scrollBehavior).toBe('auto');

    await page.locator('header a[href="#about"]').click();
    await expect(page).toHaveURL(/#about$/);
    await expect(page.locator('#about-title')).toBeVisible();

    await context.close();
  });

  test('typography variables and visible brand marks render in both locales', async ({page}) => {
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle'});

    const fontVars = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        sans: style.getPropertyValue('--font-plex-sans').trim(),
        arabic: style.getPropertyValue('--font-plex-arabic').trim(),
        mono: style.getPropertyValue('--font-plex-mono').trim(),
      };
    });

    expect(fontVars.sans).not.toBe('');
    expect(fontVars.arabic).not.toBe('');
    expect(fontVars.mono).not.toBe('');

    await expect(page.locator('.cvGoogleBrand')).toHaveCount(2);
    await expect(page.locator('.cvGoogleBrand svg').first()).toBeVisible();
    await expect(page.locator('.cvGoogleMark')).toBeVisible();
    await expect(page.locator('.cvLinkedInLink svg')).toBeVisible();

    await page.goto(`${BASE}/ar`, {waitUntil: 'networkidle'});
    await expect(page.locator('.cvGoogleBrand')).toHaveCount(2);
    await expect(page.locator('.cvGoogleMark')).toBeVisible();
    await expect(page.locator('.cvLinkedInLink svg')).toBeVisible();
  });



  test('desktop visual polish keeps labels adjacent and brand CTAs prominent', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});
    await page.goto(`${BASE}/ar`, {waitUntil: 'networkidle'});

    const aboutLabel = page.locator('#about .cvSectionLabel');
    const aboutTitle = page.locator('#about-title-ar');
    const labelBox = await aboutLabel.boundingBox();
    const titleBox = await aboutTitle.boundingBox();

    expect(labelBox).not.toBeNull();
    expect(titleBox).not.toBeNull();
    const labelInlineStart = labelBox.x + labelBox.width;
    const titleInlineStart = titleBox.x + titleBox.width;
    expect(Math.abs(labelInlineStart - titleInlineStart)).toBeLessThanOrEqual(24);
    expect(labelBox.y + labelBox.height).toBeLessThanOrEqual(titleBox.y + 4);

    const googleSize = await page.locator('.cvGoogleBrand svg').first().evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {width: rect.width, height: rect.height};
    });
    expect(googleSize.width).toBeGreaterThanOrEqual(38);
    expect(googleSize.height).toBeGreaterThanOrEqual(38);

    const contactSizes = await page.locator('.cvContactLinks a').evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return {width: rect.width, height: rect.height};
      }),
    );
    expect(contactSizes.length).toBeGreaterThanOrEqual(2);
    expect(contactSizes.every((size) => size.height >= 60)).toBe(true);
  });



  test('header tracks the current narrative section', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle'});

    await page.locator('#journey').scrollIntoViewIfNeeded();
    await page.evaluate(() => document.getElementById('journey')?.scrollIntoView({block: 'center'}));
    await page.waitForTimeout(350);

    await expect(page.locator('header a[href="#journey"]')).toHaveAttribute('aria-current', 'location');
  });

  test('footer closes the document without a trailing layout gap', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});

    for (const route of ['/', '/ar']) {
      await page.goto(`${BASE}${route}`, {waitUntil: 'networkidle'});
      const footer = page.locator('.cvFooter');
      await footer.scrollIntoViewIfNeeded();

      const trailingGap = await footer.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const footerBottom = rect.bottom + window.scrollY;
        return document.documentElement.scrollHeight - footerBottom;
      });

      expect(trailingGap).toBeLessThanOrEqual(8);
    }
  });

  test('career map is keyboard operable and updates one clear detail region', async ({page}) => {
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle'});

    const governance = page.getByRole('button', {name: /Governance & DGA/i});
    await governance.focus();
    await expect(governance).toBeFocused();
    await governance.press('Enter');
    await expect(governance).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.cvMapDetail')).toContainText('Governance & DGA');
  });
});
