import {createProjectCard, bindProjectModal} from '/portfolio/work-ui.js';
import {loadWorkProjects, projectArt} from '/portfolio/work-projects.js';

const initialized = new WeakSet();

/**
 * Mount the very same Work card factory, cover art and native modal used by
 * the published homepage. Only the responsive placement is local to the footer.
 */
async function mount() {
  const roots = [...document.querySelectorAll('[data-related-work]')];
  for (const root of roots) {
    if (initialized.has(root)) continue;
    initialized.add(root);
    const locale = root.dataset.locale === 'ar' ? 'ar' : 'en';
    const current = root.dataset.current;
    const track = root.querySelector('.project-track');
    const dialog = root.querySelector('.project-modal');
    const prev = root.querySelector('[data-related-prev]');
    const next = root.querySelector('[data-related-next]');
    const count = root.querySelector('[data-related-count]');
    const status = root.querySelector('[data-related-status]');
    if (!track || !dialog || !prev || !next || !count) continue;

    const projects = (await loadWorkProjects()).filter(p => p.id !== current);
    if (!root.isConnected) continue;
    if (!projects.length) {root.hidden = true; continue;}
    let index = 0, scrollDebounce;

    const dialogController = bindProjectModal(dialog, {
      getLang: () => locale,
      renderArt: projectArt,
    });
    projects.forEach(project => {
      const item = document.createElement('article');
      item.className = 'project-item';
      const button = createProjectCard(project, {
        lang: locale,
        renderArt: projectArt,
        onOpen: (entry, opener) => dialogController.open(entry, opener),
      });
      item.append(button);
      track.append(item);
    });

    function syncCount() {
      const title = projects[index]?.title?.[locale] || '';
      count.textContent = title;
      prev.disabled = index === 0;
      next.disabled = index === projects.length - 1;
    }
    function select(n, behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth') {
      index = Math.max(0, Math.min(projects.length - 1, n));
      if (getComputedStyle(track).display === 'flex') {
        const item = track.children[index];
        if (item) {
          const target = item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2;
          track.scrollTo({left: target, behavior});
        }
      }
      syncCount();
    }

    prev.addEventListener('click', () => select(index - 1));
    next.addEventListener('click', () => select(index + 1));
    track.addEventListener('keydown', event => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      select(index + (event.key === 'ArrowRight' ? 1 : -1));
    });
    track.addEventListener('scroll', () => {
      if (getComputedStyle(track).display !== 'flex') return;
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0, distance = Infinity;
        [...track.children].forEach((el, i) => {
          const gap = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
          if (gap < distance) {distance = gap; nearest = i;}
        });
        index = nearest;
        syncCount();
      }, 150);
    }, {passive: true});
    syncCount();
    if (status) status.hidden = true;
    root.dataset.ready = 'true';
    if (projects.length === 1) root.dataset.single = 'true';
  }
}

document.addEventListener('portfolio:related-work-mount', () => { void mount(); });
void mount();
