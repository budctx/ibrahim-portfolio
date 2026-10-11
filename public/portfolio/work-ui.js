/* The approved Work DOM factory and native dialog, shared by home and gallery. */
export const arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10"/></svg>';

export function createProjectCard(p, {lang, renderArt, onOpen, href}) {
  const btn = document.createElement(href ? 'a' : 'button');
  btn.className = 'project-card';
  if (href) btn.href = href;
  else { btn.type = 'button'; btn.setAttribute('aria-haspopup', 'dialog'); }
  btn.dir = lang === 'ar' ? 'rtl' : 'ltr';
  btn.setAttribute('aria-label', (lang === 'ar' ? 'عرض ' : 'Open ') + p.title[lang]);
  const art = renderArt(p); art.setAttribute('aria-hidden', 'true'); btn.append(art);
  const meta = document.createElement('div'); meta.className = 'project-meta';
  const text = document.createElement('div'), title = document.createElement('h3'), category = document.createElement('p');
  title.textContent = p.title[lang]; category.textContent = p.category[lang]; text.append(title, category);
  const icon = document.createElement('span'); icon.className = 'project-open'; icon.innerHTML = arrow;
  meta.append(text, icon); btn.append(meta);
  if (onOpen) btn.addEventListener('click', e => {
    if (href && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button)) return;
    e.preventDefault(); onOpen(p, btn);
  });
  return btn;
}

export function bindProjectModal(dialog, {getLang, renderArt, onClose = () => {}, fallbackFocus}) {
  let opener = null, scrollStyles = null;
  const closeButton = dialog.querySelector('#modal-close');
  const entity = document.createElement('p'); entity.className = 'modal-description'; entity.id = 'modal-entity'; entity.hidden = true;
  dialog.querySelector('#modal-description').after(entity);
  function fill(p) {
    const lang = getLang();
    dialog.querySelector('#modal-art').replaceChildren(renderArt(p, true));
    dialog.querySelector('#modal-category').textContent = p.category[lang];
    dialog.querySelector('#modal-title').textContent = p.title[lang];
    dialog.querySelector('#modal-description').textContent = p.description[lang];
    entity.hidden = !p.entity; entity.replaceChildren();
    if (p.entity) {
      if (p.entityLogo) {
        const logo = document.createElement('img'); logo.src = p.entityLogo;
        logo.alt = ''; logo.width = 28; logo.height = 28; entity.append(logo);
      }
      const name = document.createElement('span');
      name.textContent = p.categorySlug === 'discord' && !p.selfInitiated ? (lang === 'ar' ? 'سيرفر ' + p.entity[lang] : p.entity[lang] + ' server') : p.entity[lang];
      entity.append(name);
    }
    const link = dialog.querySelector('#modal-link'); link.hidden = !p.url;
    if (p.url) link.href = p.url; else link.removeAttribute('href');
    dialog.lang = lang; dialog.dir = lang === 'ar' ? 'rtl' : 'ltr';
    closeButton?.setAttribute('aria-label', lang === 'ar' ? 'إغلاق' : 'Close');
  }
  function open(p, source) {
    opener = source || fallbackFocus?.() || null; fill(p);
    if (dialog.open) return;
    scrollStyles ??= [document.documentElement, document.body, document.getElementById('scenes')].filter(Boolean).map(el => [el, el.style.overflow]);
    scrollStyles.forEach(([el]) => { el.style.overflow = 'hidden'; });
    dialog.showModal(); dialog.scrollTop = 0;
  }
  function close() { if (dialog.open) dialog.close(); }
  closeButton?.addEventListener('click', close);
  dialog.addEventListener('click', e => {
    if (e.target !== dialog) return;
    const r = (dialog.querySelector('.gallery-modal-panel') || dialog).getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close();
  });
  dialog.addEventListener('close', () => {
    // close events are queued: an intervening history action may already reopen it.
    if (dialog.open) return;
    scrollStyles?.forEach(([el, value]) => { el.style.overflow = value; }); scrollStyles = null;
    if (opener?.isConnected) opener.focus({preventScroll:true});
    onClose();
  });
  dialog.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const items = [...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled])')].filter(el => !el.hidden && el.getClientRects().length);
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {e.preventDefault(); last.focus();}
    else if (!e.shiftKey && document.activeElement === last) {e.preventDefault(); first.focus();}
  });
  return {open, close, fill};
}
