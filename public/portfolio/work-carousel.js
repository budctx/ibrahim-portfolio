/** Geometry follows the physical LTR rail; each card keeps its own text direction. */
export function bindWorkCarousel({track, prev, next, count, getLocale}) {
  function metrics() {
    const rail = track.getBoundingClientRect();
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    const position = Math.max(0, Math.min(max, track.scrollLeft));
    const items = [...track.children].map(el => {
      const box = el.getBoundingClientRect();
      return {box, target: Math.max(0, Math.min(max,
        position + box.left - rail.left - (track.clientWidth - box.width) / 2))};
    });
    return {rail, max, position, items};
  }
  function sync() {
    const {rail, max, position, items} = metrics();
    if (!items.length) return;
    const visible = items.flatMap(({box}, index) => {
      const overlap = Math.max(0, Math.min(box.right, rail.right) - Math.max(box.left, rail.left));
      return overlap >= Math.min(box.width, rail.width) * .6 ? [index] : [];
    });
    const first = visible[0] ?? 0, last = visible.at(-1) ?? first;
    count.textContent = `${first + 1}${last === first ? '' : '–' + (last + 1)} / ${items.length}`;
    count.setAttribute('aria-label', getLocale() === 'ar'
      ? `الأعمال الظاهرة: ${first + 1} إلى ${last + 1} من ${items.length}`
      : `Visible projects: ${first + 1} to ${last + 1} of ${items.length}`);
    prev.disabled = position <= 2;
    next.disabled = position >= max - 2;
  }
  function move(direction) {
    const {position, items, max} = metrics();
    const targets = items.map(item => item.target);
    const target = direction > 0
      ? targets.find(value => value > position + 2) ?? max
      : targets.findLast(value => value < position - 2) ?? 0;
    track.scrollTo({left: target, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  }
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  });
  track.addEventListener('scroll', sync, {passive: true});
  new ResizeObserver(sync).observe(track);
  sync();
  return {sync};
}
