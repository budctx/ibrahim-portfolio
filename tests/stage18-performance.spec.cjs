const {test, expect} = require('@playwright/test');

const BASE = 'http://127.0.0.1:3000';

for (const route of ['/', '/ar']) {
  test(`lab performance guardrails on ${route}`, async ({page}) => {
    await page.addInitScript(() => {
      window.__portfolioVitals = {lcp: 0, cls: 0};

      try {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const last = entries[entries.length - 1];
          if (last) window.__portfolioVitals.lcp = last.startTime;
        }).observe({type: 'largest-contentful-paint', buffered: true});
      } catch {}

      try {
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) cls += entry.value;
          }
          window.__portfolioVitals.cls = cls;
        }).observe({type: 'layout-shift', buffered: true});
      } catch {}
    });

    await page.setViewportSize({width: 1440, height: 1000});
    await page.goto(`${BASE}${route}`, {waitUntil: 'networkidle'});
    await page.waitForTimeout(500);

    const vitals = await page.evaluate(() => window.__portfolioVitals);
    expect(vitals.lcp).toBeGreaterThan(0);
    expect(vitals.lcp).toBeLessThan(3000);
    expect(vitals.cls).toBeLessThanOrEqual(0.1);
  });
}
