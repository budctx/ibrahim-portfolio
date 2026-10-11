const control = document.querySelector('.floating-design');
const stage = document.querySelector('.gallery-stage');
if (control && stage) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let x = -8, y = -16, drag = null, moved = false;
  const clamp = (n, limit) => Math.max(-limit, Math.min(limit, n));
  function render() {
    control.style.setProperty('--rotate-x', `${x}deg`);
    control.style.setProperty('--rotate-y', `${y}deg`);
  }
  function end(event) {
    if (!drag || event.pointerId !== drag.id) return;
    drag = null;
    control.classList.remove('is-dragging');
  }
  control.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    moved = false;
    drag = {id:event.pointerId, startX:event.clientX, startY:event.clientY, x,y};
    control.setPointerCapture(event.pointerId);
    control.classList.add('is-dragging');
  });
  control.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx=event.clientX-drag.startX, dy=event.clientY-drag.startY;
    moved ||= Math.hypot(dx,dy)>5;
    x=clamp(drag.x-dy*.18,22); y=clamp(drag.y+dx*.25,30); render();
  });
  for(const event of ['pointerup','pointercancel','lostpointercapture']) control.addEventListener(event,end);
  control.addEventListener('click', () => {
    if (moved) {moved=false;return;}
    y = y>0 ? -16 : 16; render();
  });
  control.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key)) return;
    event.preventDefault();
    if(event.key==='Home'){x=-8;y=-16;}
    else if(event.key==='ArrowLeft')y=clamp(y-6,30);
    else if(event.key==='ArrowRight')y=clamp(y+6,30);
    else x=clamp(x+(event.key==='ArrowUp'?-6:6),22);
    render();
  });
  const visibility = new IntersectionObserver(entries => {
    control.classList.toggle('is-visible', entries[0].isIntersecting && !document.hidden);
  });
  visibility.observe(control);
  document.addEventListener('visibilitychange',()=>control.classList.toggle('is-visible',!document.hidden));
  reduced.addEventListener('change',()=>{x=-8;y=-16;render();});
  render();
}
