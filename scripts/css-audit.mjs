import fs from 'node:fs';

const portfolioPath = new URL('../src/app/portfolio.css', import.meta.url);
const globalsPath = new URL('../src/app/globals.css', import.meta.url);

const css = fs.readFileSync(portfolioPath, 'utf8');
const globals = fs.readFileSync(globalsPath, 'utf8');

function stripComments(input) {
  return input.replace(/\/\*[\s\S]*?\*\//g, '');
}

function splitTop(input) {
  const blocks = [];
  let start = 0;
  let i = 0;
  let quote = null;

  while (i < input.length) {
    const ch = input[i];

    if (quote) {
      if (ch === quote && input[i - 1] !== '\\') quote = null;
      i += 1;
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      i += 1;
      continue;
    }

    if (ch === '{') {
      const header = input.slice(start, i).trim();
      let depth = 1;
      let j = i + 1;
      let innerQuote = null;

      for (; j < input.length; j += 1) {
        const current = input[j];

        if (innerQuote) {
          if (current === innerQuote && input[j - 1] !== '\\') innerQuote = null;
          continue;
        }

        if (current === '"' || current === "'") {
          innerQuote = current;
          continue;
        }

        if (current === '{') depth += 1;
        if (current === '}') {
          depth -= 1;
          if (depth === 0) break;
        }
      }

      blocks.push({header, body: input.slice(i + 1, j)});
      start = j + 1;
      i = j + 1;
      continue;
    }

    i += 1;
  }

  return blocks;
}

const selectorsByContext = new Map();
const fontSizes = new Set();
const fontWeights = new Set();
const responsiveContexts = new Set();

function inspect(input, context = 'root') {
  for (const block of splitTop(stripComments(input))) {
    if (!block.header) continue;

    if (block.header.startsWith('@media') || block.header.startsWith('@container')) {
      const childContext = block.header.replace(/\s+/g, ' ').trim();
      responsiveContexts.add(childContext);
      inspect(block.body, childContext);
      continue;
    }

    if (block.header.startsWith('@')) continue;

    if (!selectorsByContext.has(context)) selectorsByContext.set(context, new Map());
    const contextSelectors = selectorsByContext.get(context);

    for (const selector of block.header.split(',').map((item) => item.trim()).filter(Boolean)) {
      contextSelectors.set(selector, (contextSelectors.get(selector) ?? 0) + 1);
    }

    for (const match of block.body.matchAll(/font-size:\s*([^;]+);/g)) fontSizes.add(match[1].trim());
    for (const match of block.body.matchAll(/font-weight:\s*([^;]+);/g)) fontWeights.add(match[1].trim());
  }
}

inspect(css);

const duplicateSelectors = [];
for (const [context, selectors] of selectorsByContext) {
  for (const [selector, count] of selectors) {
    if (count > 1) duplicateSelectors.push({context, selector, count});
  }
}

const allowedWeights = new Set(['400', '500', '600', '700', 'normal', 'bold', 'inherit']);
const unsupportedWeights = [...fontWeights].filter((weight) => !allowedWeights.has(weight));

const checks = [
  {
    name: 'portfolio CSS <= 50KB',
    ok: Buffer.byteLength(css) <= 50_000,
    detail: `${Buffer.byteLength(css)} bytes`,
  },
  {
    name: 'globals contains no .cv portfolio selectors',
    ok: !/\.cv[A-Za-z0-9_-]+/.test(globals),
    detail: 'portfolio styles must stay isolated in portfolio.css',
  },
  {
    name: 'no duplicate selectors inside the same responsive context',
    ok: duplicateSelectors.length === 0,
    detail: duplicateSelectors.length ? JSON.stringify(duplicateSelectors.slice(0, 10)) : '0 duplicates',
  },
  {
    name: 'only loaded IBM Plex weights are authored',
    ok: unsupportedWeights.length === 0,
    detail: unsupportedWeights.length ? unsupportedWeights.join(', ') : '400/500/600/700 only',
  },
  {
    name: 'font-size vocabulary <= 32 values',
    ok: fontSizes.size <= 32,
    detail: `${fontSizes.size} values`,
  },
  {
    name: 'responsive contexts <= 10',
    ok: responsiveContexts.size <= 10,
    detail: `${responsiveContexts.size} contexts`,
  },
];

for (const check of checks) {
  console.log(`${check.ok ? 'PASS' : 'FAIL'} · ${check.name} · ${check.detail}`);
}

if (checks.some((check) => !check.ok)) process.exit(1);
