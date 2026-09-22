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

  test('floating contact CTA works repeatedly and stays outside the hero in both locales', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});
    await page.emulateMedia({reducedMotion: 'reduce'});

    for (const route of ['/', '/ar']) {
      await page.goto(`${BASE}${route}`, {waitUntil: 'networkidle'});
      await expect(page.locator('.cvHeroActions a')).toHaveCount(1);
      await expect(page.locator('.cvHeroActions a[href="#contact"]')).toHaveCount(0);

      const floating = page.locator('.cvFloatingContact[href="#contact"]');
      await expect(floating).toBeVisible();

      await floating.click();
      await expect(page).toHaveURL(/#contact$/);
      expect(await page.locator('#contact').evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(160);

      await page.evaluate(() => window.scrollTo(0, 0));
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(8);

      await floating.click();
      expect(await page.locator('#contact').evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(160);
    }
  });

  test('career map starts at the top, advances after eight seconds, and keeps a stable detail frame', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle'});

    await expect(page.locator('.cvSignal').first()).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.cvMapDetail')).toContainText('Management Information Systems');

    const before = await page.locator('.cvMapDetail').boundingBox();
    await page.waitForTimeout(8300);
    const after = await page.locator('.cvMapDetail').boundingBox();

    await expect(page.locator('.cvSignal').nth(1)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.cvMapDetail')).toContainText('Healthcare operations');
    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    expect(Math.abs(before.height - after.height)).toBeLessThanOrEqual(1);
  });

  test('English grid safe spaces hold on desktop and mobile while scroll motion enters and exits', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle'});

    const desktop = await page.evaluate(() => {
      const frame = document.querySelector('.cvFrame').getBoundingClientRect();
      const copy = document.querySelector('.cvHeroCopy').getBoundingClientRect();
      const map = document.querySelector('.cvMap').getBoundingClientRect();
      return {
        frame: {left: frame.left, right: frame.right},
        copy: {left: copy.left, right: copy.right},
        map: {left: map.left, right: map.right},
        width: window.innerWidth,
      };
    });

    expect(desktop.frame.left).toBeGreaterThanOrEqual(48);
    expect(desktop.width - desktop.frame.right).toBeGreaterThanOrEqual(48);
    expect(desktop.map.left - desktop.copy.right).toBeGreaterThanOrEqual(40);

    await expect(page.locator('html')).toHaveAttribute('data-cv-motion', 'ready');
    await page.locator('#resolve').scrollIntoViewIfNeeded();
    await page.evaluate(() => document.getElementById('resolve')?.scrollIntoView({block: 'center'}));
    await expect.poll(() => page.locator('#resolve').getAttribute('data-motion-state')).toBe('in');

    await page.locator('#evidence').scrollIntoViewIfNeeded();
    await page.evaluate(() => document.getElementById('evidence')?.scrollIntoView({block: 'center'}));
    await expect.poll(() => page.locator('#resolve').getAttribute('data-motion-state')).toBe('after');

    await page.setViewportSize({width: 390, height: 844});
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle'});
    await expectNoHorizontalOverflow(page);

    const mobile = await page.evaluate(() => {
      const frame = document.querySelector('.cvFrame').getBoundingClientRect();
      return {
        left: frame.left,
        right: window.innerWidth - frame.right,
      };
    });

    expect(mobile.left).toBeGreaterThanOrEqual(19);
    expect(mobile.right).toBeGreaterThanOrEqual(19);
  });

  test('homepage keeps the animated keyword focus without section CTA bars', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});

    for (const route of ['/', '/ar']) {
      await page.goto(`${BASE}${route}`, {waitUntil: 'networkidle'});
      await expect(page.locator('.cvHeroKeywordLoop')).toBeVisible();
      await expect(page.locator('.cvSectionNext')).toHaveCount(0);
    }
  });

  test('contact exposes WhatsApp phone and Saudi Arabia in both locales', async ({page}) => {
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle'});
    await expect(page.locator('.cvContactGrid a[href="https://wa.me/966597866665"]')).toBeVisible();
    await expect(page.locator('.cvContactGrid a[href="tel:+966597866665"]')).toBeVisible();
    await expect(page.locator('.cvContactGrid')).toContainText('Saudi Arabia');
    await expect(page.locator('.cvContactGrid .cvContactCard')).toHaveCount(5);

    await page.goto(`${BASE}/ar`, {waitUntil: 'networkidle'});
    await expect(page.locator('.cvContactGrid a[href="https://wa.me/966597866665"]')).toBeVisible();
    await expect(page.locator('.cvContactGrid a[href="tel:+966597866665"]')).toBeVisible();
    await expect(page.locator('.cvContactGrid')).toContainText('السعودية');
    await expect(page.locator('.cvContactGrid .cvContactCard')).toHaveCount(5);
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

    await page.locator('header a[href="#resolve"]').click();
    await expect(page).toHaveURL(/#resolve$/);
    await expect(page.locator('#resolve-title')).toBeVisible();

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

    await expect(page.locator('.cvEvidenceRailV3 > div')).toHaveCount(5);
    await expect(page.locator('.cvGoogleMark')).toBeVisible();
    await expect(page.locator('.cvLinkedInLink svg')).toBeVisible();

    await page.goto(`${BASE}/ar`, {waitUntil: 'networkidle'});
    await expect(page.locator('.cvEvidenceRailV3 > div')).toHaveCount(5);
    await expect(page.locator('.cvGoogleMark')).toBeVisible();
    await expect(page.locator('.cvLinkedInLink svg')).toBeVisible();
  });



  test('desktop visual polish keeps labels adjacent and brand CTAs prominent', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});
    await page.goto(`${BASE}/ar`, {waitUntil: 'networkidle'});

    const aboutLabel = page.locator('#resolve .cvSectionLabel');
    const aboutTitle = page.locator('#resolve-title-ar');
    const labelBox = await aboutLabel.boundingBox();
    const titleBox = await aboutTitle.boundingBox();

    expect(labelBox).not.toBeNull();
    expect(titleBox).not.toBeNull();
    const labelInlineStart = labelBox.x + labelBox.width;
    const titleInlineStart = titleBox.x + titleBox.width;
    expect(Math.abs(labelInlineStart - titleInlineStart)).toBeLessThanOrEqual(24);
    expect(labelBox.y + labelBox.height).toBeLessThanOrEqual(titleBox.y + 4);

    const evidenceIconSize = await page.locator('.cvEvidenceRailV3 .cvEvidenceLabel svg').first().evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {width: rect.width, height: rect.height};
    });
    expect(evidenceIconSize.width).toBeGreaterThanOrEqual(30);
    expect(evidenceIconSize.height).toBeGreaterThanOrEqual(30);

    const contactSizes = await page.locator('.cvContactGrid .cvContactCard').evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          width: rect.width,
          height: rect.height,
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
        };
      }),
    );
    expect(contactSizes).toHaveLength(5);
    expect(Math.max(...contactSizes.map((size) => size.width)) - Math.min(...contactSizes.map((size) => size.width))).toBeLessThanOrEqual(1);
    expect(Math.max(...contactSizes.map((size) => size.height)) - Math.min(...contactSizes.map((size) => size.height))).toBeLessThanOrEqual(1);
    expect(new Set(contactSizes.map((size) => size.backgroundColor)).size).toBe(1);
    expect(new Set(contactSizes.map((size) => size.borderColor)).size).toBe(1);
  });



  test('Arabic hero keeps a real safe zone and stacks before medium-width compression', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});
    await page.goto(`${BASE}/ar`, {waitUntil: 'networkidle'});

    const desktop = await page.evaluate(() => {
      const rect = (selector) => document.querySelector(selector)?.getBoundingClientRect();
      const hero = rect('.cvHero');
      const copy = rect('.cvHeroCopy');
      const map = rect('.cvMap');
      const title = rect('#cv-home-title-ar');
      const lede = rect('.cvLede');
      const primary = rect('.cvHeroActions .cvButtonPrimary');
      const lineTops = [...document.querySelectorAll('.cvHeroTitleLine')]
        .map((element) => Math.round(element.getBoundingClientRect().top));

      return {
        viewportWidth: window.innerWidth,
        hero: hero && {left: hero.left, right: hero.right, width: hero.width},
        copy: copy && {left: copy.left, right: copy.right, width: copy.width},
        map: map && {left: map.left, right: map.right, width: map.width},
        title: title && {left: title.left, right: title.right, width: title.width},
        lede: lede && {left: lede.left, right: lede.right, width: lede.width},
        primary: primary && {left: primary.left, right: primary.right, width: primary.width},
        lineTops,
      };
    });

    expect(desktop.hero).not.toBeNull();
    expect(desktop.copy).not.toBeNull();
    expect(desktop.map).not.toBeNull();
    expect(desktop.title).not.toBeNull();
    expect(desktop.lede).not.toBeNull();
    expect(desktop.primary).not.toBeNull();

    expect(desktop.map.right).toBeLessThan(desktop.copy.left);
    expect(desktop.copy.left - desktop.map.right).toBeGreaterThanOrEqual(56);

    expect(desktop.title.left).toBeGreaterThanOrEqual(desktop.copy.left - 1);
    expect(desktop.title.right).toBeLessThanOrEqual(desktop.copy.right + 1);
    expect(desktop.viewportWidth - desktop.title.right).toBeGreaterThanOrEqual(36);

    expect(desktop.lede.width).toBeLessThan(desktop.title.width);
    expect(Math.abs(desktop.primary.right - desktop.title.right)).toBeLessThanOrEqual(24);

    expect(new Set(desktop.lineTops).size).toBe(2);

    await page.setViewportSize({width: 1100, height: 1000});
    await page.goto(`${BASE}/ar`, {waitUntil: 'networkidle'});

    const medium = await page.evaluate(() => {
      const copy = document.querySelector('.cvHeroCopy')?.getBoundingClientRect();
      const map = document.querySelector('.cvMap')?.getBoundingClientRect();
      return {
        copy: copy && {top: copy.top, bottom: copy.bottom, left: copy.left, right: copy.right},
        map: map && {top: map.top, bottom: map.bottom, left: map.left, right: map.right},
      };
    });

    expect(medium.copy).not.toBeNull();
    expect(medium.map).not.toBeNull();
    expect(medium.map.top).toBeGreaterThanOrEqual(medium.copy.bottom + 48);
  });

  test('desktop hero fits the first viewport without clipping core content', async ({page}) => {
    await page.setViewportSize({width: 1752, height: 864});
    await page.goto(`${BASE}/ar`, {waitUntil: 'networkidle'});

    const metrics = await page.evaluate(() => {
      const hero = document.querySelector('.cvHero')?.getBoundingClientRect();
      const map = document.querySelector('.cvMap')?.getBoundingClientRect();
      const copy = document.querySelector('.cvHeroCopy')?.getBoundingClientRect();
      const next = document.querySelector('#resolve')?.getBoundingClientRect();
      const mapGrid = document.querySelector('.cvMapGrid');
      const mapGridStyle = mapGrid ? getComputedStyle(mapGrid) : null;
      return {
        viewportHeight: window.innerHeight,
        hero: hero && {top: hero.top, bottom: hero.bottom, height: hero.height},
        map: map && {top: map.top, bottom: map.bottom, height: map.height},
        copy: copy && {top: copy.top, bottom: copy.bottom, height: copy.height},
        next: next && {top: next.top},
        mapColumns: mapGridStyle?.gridTemplateColumns || '',
      };
    });

    expect(metrics.hero).not.toBeNull();
    expect(metrics.map).not.toBeNull();
    expect(metrics.copy).not.toBeNull();
    expect(metrics.next).not.toBeNull();

    expect(metrics.hero.bottom).toBeLessThanOrEqual(metrics.viewportHeight + 1);
    expect(metrics.map.bottom).toBeLessThanOrEqual(metrics.hero.bottom + 1);
    expect(metrics.copy.bottom).toBeLessThanOrEqual(metrics.hero.bottom + 1);
    expect(metrics.next.top).toBeGreaterThanOrEqual(metrics.viewportHeight - 1);
    expect(metrics.mapColumns.split(' ').filter(Boolean).length).toBeGreaterThanOrEqual(2);
  });

  test('Arabic core narrative headings preserve readable line rhythm', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});
    await page.goto(`${BASE}/ar`, {waitUntil: 'networkidle'});

    const metrics = await page.evaluate(() => {
      const selectors = [
        '#cv-home-title-ar',
        '#resolve-title-ar',
        '#evidence-title-ar',
        '#contact-title-ar',
      ];

      return selectors.map((selector) => {
        const element = document.querySelector(selector);
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const fontSize = parseFloat(style.fontSize);
        const lineHeight = parseFloat(style.lineHeight);
        return {
          selector,
          right: rect.right,
          height: rect.height,
          fontSize,
          lineHeight,
          lines: Math.round(rect.height / lineHeight),
        };
      });
    });

    const axis = metrics.map((item) => item.right);
    expect(Math.max(...axis) - Math.min(...axis)).toBeLessThanOrEqual(18);

    const hero = metrics.find((item) => item.selector === '#cv-home-title-ar');
    expect(hero.lines).toBeLessThanOrEqual(2);
    expect(hero.lineHeight / hero.fontSize).toBeGreaterThanOrEqual(1.14);

    const sectionHeadings = metrics.filter((item) => item.selector !== '#cv-home-title-ar');
    expect(sectionHeadings.every((item) => item.lineHeight / item.fontSize >= 1.24)).toBe(true);
    expect(sectionHeadings.every((item) => item.lines <= 2)).toBe(true);
  });

  test('header tracks the current consolidated narrative section', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle'});

    await page.locator('#evidence').scrollIntoViewIfNeeded();
    await page.evaluate(() => document.getElementById('evidence')?.scrollIntoView({block: 'center'}));
    await page.waitForTimeout(350);

    await expect(page.locator('header a[href="#evidence"]')).toHaveAttribute('aria-current', 'location');
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

    const experience = page.getByRole('button', {name: /^04.*Experience/i});
    await experience.focus();
    await expect(experience).toBeFocused();
    await experience.press('Enter');
    await expect(experience).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.cvMapDetail')).toContainText('DGA-oriented work');
  });
});
