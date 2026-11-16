import {createProjectCard, bindProjectModal} from '/portfolio/work-ui.js';
import {bindWorkCarousel} from '/portfolio/work-carousel.js';
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

    bindWorkCarousel({track, prev, next, count, getLocale: () => locale});
    if (status) status.hidden = true;
    root.dataset.ready = 'true';
    if (projects.length === 1) root.dataset.single = 'true';
  }
}

document.addEventListener('portfolio:related-work-mount', () => { void mount(); });
void mount();
