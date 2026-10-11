import {createProjectCard, bindProjectModal} from './work-ui.js';

const data = JSON.parse(document.getElementById('gallery-data').textContent);
const lang = data.locale;
const grid = document.getElementById('gallery-grid');
const dialog = document.getElementById('project-modal');
const language = document.getElementById('gallery-language');
const designs = new Map(data.designs.map(p => [p.slug, p]));
const cards = new Map();
const basePath = location.pathname;
const stateKey = 'graphicGalleryModal';
let historyClosePending=false, queuedOpen=null;

function syncLanguageLink() {
  const url = new URL(language.href);
  const slug = new URL(location.href).searchParams.get('design');
  if (slug && designs.has(slug)) url.searchParams.set('design', slug);
  else url.searchParams.delete('design');
  language.href = url.pathname + url.search;
  const modalLanguage=document.getElementById('modal-language');
  if(modalLanguage)modalLanguage.href=language.href;
}

function renderArt(p, inModal = false) {
  const art = document.createElement('div'); art.className = 'project-art gallery-art';
  const images = inModal ? [p.cover, ...p.images] : [p.cover];
  for (const [index, media] of images.entries()) {
    const img = document.createElement('img'); img.src = media.url;
    img.alt = inModal ? media.alt[lang] : ''; img.decoding = 'async';
    img.loading = inModal && index === 0 ? 'eager' : 'lazy';
    img.addEventListener('error', () => {
      const note = document.createElement('p'); note.className = 'media-error';
      note.textContent = lang === 'ar' ? 'تعذّر تحميل الصورة.' : 'Image could not be loaded.';
      img.replaceWith(note);
    }, {once:true});
    art.append(img);
  }
  return art;
}

const modal = bindProjectModal(dialog, {
  getLang: () => lang, renderArt,
  fallbackFocus: () => document.getElementById('gallery-title'),
  onClose() {
    const url = new URL(location.href);
    if (!url.searchParams.has('design')) return;
    if (history.state?.[stateKey] === basePath) {historyClosePending=true; history.back();}
    else {url.searchParams.delete('design'); history.replaceState(history.state, '', url); syncLanguageLink();}
  }
});

function syncFromUrl() {
  const url = new URL(location.href), slug = url.searchParams.get('design');
  const p = designs.get(slug);
  if (p) modal.open(p, cards.get(slug));
  else {
    if (slug) {
      url.searchParams.delete('design'); history.replaceState(null, '', url);
      const notice = document.getElementById('gallery-notice') || document.createElement('p');
      notice.id = 'gallery-notice'; notice.setAttribute('role','status');
      notice.textContent = lang === 'ar' ? 'هذا التصميم غير متاح حاليًا.' : 'This design is not currently available.';
      document.getElementById('gallery-title').after(notice);
    }
    modal.close();
  }
  syncLanguageLink();
}

if (grid) {
  grid.replaceChildren();
  for (const p of data.designs) {
    const article = document.createElement('article'); article.className = 'project-item';
    const url = new URL(location.href); url.searchParams.set('design', p.slug);
    const card = createProjectCard(p, {lang, renderArt, href:url.pathname + url.search,
      onOpen(project) {
        if(historyClosePending){queuedOpen=project.slug;return;}
        if (new URL(location.href).searchParams.get('design') !== project.slug)
          history.pushState({[stateKey]:basePath}, '', url.pathname + url.search);
        syncFromUrl();
      }
    });
    card.setAttribute('aria-haspopup','dialog'); card.dataset.design = p.slug;
    article.append(card); grid.append(article); cards.set(p.slug, card);
  }
}

const share = document.createElement('button'); share.type = 'button'; share.className = 'modal-share';
share.textContent = lang === 'ar' ? 'نسخ رابط التصميم' : 'Copy design link';
const feedback = document.createElement('span'); feedback.setAttribute('role','status'); feedback.className = 'share-feedback';
const copyField = document.createElement('input'); copyField.readOnly = true; copyField.hidden = true;
copyField.className = 'share-url'; copyField.setAttribute('aria-label',lang === 'ar' ? 'رابط التصميم' : 'Design URL');
share.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(location.href); feedback.textContent = lang === 'ar' ? 'تم النسخ' : 'Copied'; }
  catch {copyField.hidden = false; copyField.value = location.href; copyField.focus(); copyField.select();}
});
const modalLanguage=language.cloneNode(true); modalLanguage.id='modal-language'; modalLanguage.classList.add('modal-language');
dialog.querySelector('.modal-copy').append(modalLanguage, share, feedback, copyField);
dialog.addEventListener('close', () => {feedback.textContent = ''; copyField.hidden = true;});
window.addEventListener('popstate', () => {
  historyClosePending=false; syncFromUrl();
  if(queuedOpen){const slug=queuedOpen;queuedOpen=null;cards.get(slug)?.click();}
});
syncFromUrl();
