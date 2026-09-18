const {test, expect} = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const BASE = 'http://127.0.0.1:3000';

for (const route of ['/', '/ar']) {
  test(`axe WCAG 2.2 AA has no serious or critical violations on ${route}`, async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000});
    await page.goto(`${BASE}${route}`, {waitUntil: 'networkidle'});

    const results = await new AxeBuilder({page})
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    const blocking = results.violations.filter((violation) =>
      violation.impact === 'serious' || violation.impact === 'critical'
    );

    expect(
      blocking,
      blocking.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        targets: violation.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  });
}
