/* Shared preference for static homepage/gallery documents. React uses the same key. */
(() => {
  const root = document.documentElement;
  let saved;
  try { saved = localStorage.getItem('portfolio-theme'); } catch { /* Storage can be unavailable. */ }
  root.dataset.theme = saved === 'light' ? 'light' : 'dark';
  function sync() {
    const dark = root.dataset.theme !== 'light';
    const ar = root.lang === 'ar';
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const label = ar ? (dark ? 'استخدام الوضع الفاتح' : 'استخدام الوضع الداكن')
        : (dark ? 'Use light mode' : 'Use dark mode');
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', label);
      button.title = label;
      button.innerHTML = dark
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/></svg>';
    });
  }
  function start() {
    sync();
    document.addEventListener('click', event => {
      if (!event.target.closest('[data-theme-toggle]')) return;
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch { /* Keep the current page usable. */ }
      sync();
    });
    new MutationObserver(sync).observe(root, {attributes: true, attributeFilter: ['lang']});
    window.addEventListener('storage', event => {
      if (event.key !== 'portfolio-theme') return;
      root.dataset.theme = event.newValue === 'light' ? 'light' : 'dark';
      sync();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true});
  else start();
})();
