/* Isolated, non-production concept enhancements.
   Original hero and existing scene engine own navigation and contact. */
(() => {
  const langToggle=document.getElementById('language');
  const workLink=document.querySelector('[data-concept-gallery-link]');
  const posters=[...document.querySelectorAll('.concept-poster')];
  function sync(){
    const ar=document.documentElement.lang!=='en';
    if(workLink){
      workLink.href='/concept-v2/gallery.html?lang='+(ar?'ar':'en');
      workLink.setAttribute('aria-label',ar?'معرض أعمال الجرافيك — تصاميم RAIS الحقيقية':'Graphic design portfolio — real RAIS artworks');
    }
    const names=ar?['تصميم إعلان بطولة Fortnite لسيرفر RAIS','تصميم إعلان بطولة Brawlhalla لسيرفر RAIS']:['RAIS Fortnite tournament visual design','RAIS Brawlhalla tournament visual design'];
    posters.forEach((p,i)=>{p.alt=names[i]||'';});
    document.querySelector('.concept-approach')?.setAttribute('aria-label',ar?'المنهج':'Approach');
    document.querySelector('.concept-work-shell')?.setAttribute('aria-label',ar?'الأعمال المختارة':'Selected work');
  }
  sync();
  langToggle?.addEventListener('click',sync);
  // Concept-only viewport test cue. No wheel interception or duplicate signature interaction.
})();