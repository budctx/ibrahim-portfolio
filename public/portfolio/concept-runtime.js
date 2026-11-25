
import {createProjectCard,bindProjectModal} from "/portfolio/work-ui.js";
const card=document.getElementById('card'),language=document.getElementById('language'),hero=document.querySelector('.hero');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let flipped=false,paused=true,lang=document.documentElement.lang,userInteracted=false;
// Count introductory delays only while the Hero is active and visible.
let heroActive=!['work','approach','about','contact'].includes(location.hash.slice(1));
let introTimer=null,introStarted=0,introRemaining=2600,introPhase=0;
function heroMotionAllowed(){return heroActive&&!document.hidden&&!reduce.matches}
function suspendIntro(){
 if(introTimer===null)return;
 clearTimeout(introTimer);introTimer=null;
 introRemaining=Math.max(0,introRemaining-(performance.now()-introStarted));
}
function syncMotion(){
 paused=!heroMotionAllowed();hero.classList.toggle('paused',paused);
 if(paused){card.style.setProperty('--tilt-x','0deg');suspendIntro()}
 if(userInteracted||introPhase>=2){suspendIntro();return}
 if(paused||introTimer!==null)return;
 introStarted=performance.now();
 introTimer=setTimeout(()=>{
  introTimer=null;introRemaining=0;
  if(!heroMotionAllowed()||userInteracted){syncMotion();return}
  flip();introPhase++;introRemaining=introPhase===1?2100:0;syncMotion();
 },introRemaining);
}
function flip(){flipped=!flipped;card.style.setProperty('--flip',flipped?'180deg':'0deg');card.setAttribute('aria-pressed',String(flipped));card.querySelector('.front').setAttribute('aria-hidden',String(flipped));card.querySelector('.back').setAttribute('aria-hidden',String(!flipped))}
card.addEventListener('click',()=>{userInteracted=true;suspendIntro();flip()});
syncMotion();
language.addEventListener('click',()=>{lang=lang==='ar'?'en':'ar';document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.querySelectorAll('[data-ar]').forEach(el=>el.textContent=el.dataset[lang].replace(/\\n/g,'\n'));language.textContent=lang==='ar'?'E':'ع';language.setAttribute('aria-label',lang==='ar'?'Switch to English':'التحويل للعربية');card.setAttribute('aria-label',lang==='ar'?'اقلب بطاقة إبراهيم العجمي':'Flip Ibrahim’s card');document.querySelector('.stage').setAttribute('aria-label',lang==='ar'?'بطاقة التعريف التفاعلية':'Interactive identity card');syncMotion()});

card.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'&&!paused&&!reduce.matches){const r=card.getBoundingClientRect();card.style.setProperty('--tilt-x',((.5-(e.clientY-r.top)/r.height)*8)+'deg')}});card.addEventListener('pointerleave',()=>card.style.setProperty('--tilt-x','0deg'));
reduce.addEventListener('change',syncMotion);
document.addEventListener('visibilitychange',syncMotion);

// Fit the complete interactive object into its own grid track, including sway clearance.
const rig=document.querySelector('.rig'),badge=document.querySelector('.badge-position');
function fitBadge(){
 const w=rig.clientWidth,h=rig.clientHeight;
 const scale=Math.max(.1,Math.min(1,(w-36)/300,(h-52)/390));
 badge.style.setProperty('--badge-scale',scale);
 badge.style.setProperty('--badge-top',Math.max(28,(h-360*scale)/2)+'px');
}
new ResizeObserver(fitBadge).observe(rig);fitBadge();

function translateNavigation(){
 const ar=lang==='ar';
 document.querySelector('.concept-tools').setAttribute('aria-label',ar?'اللغة والمظهر':'Language and appearance');
 document.querySelector('.scene-nav').setAttribute('aria-label',ar?'الأقسام':'Sections');
 document.getElementById('scenes').setAttribute('aria-label',ar?'أقسام البورتفوليو':'Portfolio sections');
 const names={main:['البداية','Introduction'],work:['الأعمال','Work'],approach:['المنهج','Approach']};
 for(const [id,n] of Object.entries(names))document.querySelector('[data-scene="'+id+'"]').setAttribute('aria-label',n[ar?0:1]);
 document.querySelectorAll('[data-concept-gallery-link]').forEach(a=>a.href='/concept-v2/gallery.html?lang='+lang);
 document.querySelectorAll('[data-case-slug]').forEach(a=>a.href='/concept-v2/'+a.dataset.caseSlug+'/'+lang+'.html');
 document.querySelectorAll('[data-alt-ar]').forEach(im=>im.alt=ar?im.dataset.altAr:im.dataset.altEn);
 card.setAttribute('aria-label',ar?'اقلب بطاقة إبراهيم العجمي':"Flip Ibrahim Al-Ajmi's card");
 document.querySelector('.stage').setAttribute('aria-label',ar?'بطاقة التعريف التفاعلية':'Interactive introduction card');
 language.textContent=ar?'EN':'ع';language.setAttribute('aria-label',ar?'Switch to English':'التبديل إلى العربية');
}
language.addEventListener('click',translateNavigation);translateNavigation();
const scenes=document.getElementById('scenes');
const sceneIds=['main','work','approach','about','contact'];
let sceneDestination=sceneIds.includes(location.hash.slice(1))?location.hash.slice(1):null;
function syncSceneHash(id){
 if(sceneDestination&&sceneDestination!==id)return;
 sceneDestination=null;
 if(location.hash!=='#'+id)history.replaceState(history.state,'','#'+id);
}
document.querySelectorAll('.scene-dot').forEach(b=>b.addEventListener('click',()=>{
 const id=b.dataset.scene;sceneDestination=id;
 if(location.hash!=='#'+id)history.pushState(history.state,'','#'+id);
 document.getElementById(id).scrollIntoView({behavior:reduce.matches?'auto':'smooth',block:'start'});
}));
for(const event of ['wheel','touchstart'])scenes.addEventListener(event,()=>{sceneDestination=null},{passive:true});
scenes.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End'].includes(e.key))sceneDestination=null});

function updateActiveScene(){
 const anchor=scenes.scrollTop+Math.min(120,scenes.clientHeight*.2);
 const sections=[...document.querySelectorAll('.scene')];
 const visible=[...sections].reverse().find(s=>s.offsetTop<=anchor)||sections[0];
 sections.forEach(section=>{const active=section===visible;section.classList.toggle('is-active',active);section.inert=!active});
 heroActive=visible===hero;syncMotion();
 document.querySelectorAll('.scene-dot').forEach(b=>b.setAttribute('aria-current',String(b.dataset.scene===visible.id)));
 syncSceneHash(visible.id);
}
let sceneFrame=null;
scenes.addEventListener('scroll',()=>{if(sceneFrame===null)sceneFrame=requestAnimationFrame(()=>{sceneFrame=null;updateActiveScene()})},{passive:true});
requestAnimationFrame(updateActiveScene);
const cubeButton=document.getElementById('cube-control'),cube=document.querySelector('.about-cube');
const cubeLabels={ar:['منتجات رقمية','جرافيك','أنظمة تصميم'],en:['Digital products','Graphic design','Design systems']};
const cubeSkills=[['UI/UX','Wireframing','Prototyping','Design Systems'],['Photoshop','Illustrator','InDesign','After Effects'],['Design Systems','UI Components','Typography','Prototyping']];
const skillList=document.getElementById('cube-skills');
let skillTimer=null,skillEpoch=0,renderedSkillIndex=-1;
const toolMonograms=['Ps','Ai','Id','Ae'];
function renderCubeSkills(){
 const index=cubeIndex,epoch=++skillEpoch;
 clearTimeout(skillTimer);skillTimer=null;
 const badges=[...skillList.children];
 badges.forEach(badge=>badge.getAnimations().forEach(animation=>animation.cancel()));
 const commit=(animate)=>{
  if(epoch!==skillEpoch)return;
  skillTimer=null;renderedSkillIndex=index;skillList.dataset.phase='ready';skillList.removeAttribute('aria-hidden');
  skillList.setAttribute('aria-label',(lang==='ar'?'مهارات — ':'Skills — ')+cubeLabels[lang][index]);
  badges.forEach((badge,i)=>{
   badge.style.opacity='';const chip=badge.firstElementChild;chip.textContent=cubeSkills[index][i];
   if(index===1){chip.dataset.tool=toolMonograms[i];const icon=document.createElement('i');icon.className='skill-tool';icon.setAttribute('aria-hidden','true');icon.dataset.symbol=toolMonograms[i];chip.prepend(icon)}else chip.removeAttribute('data-tool');
   if(animate&&!reduce.matches)badge.animate([{opacity:0,transform:`translate(${i%2?-28:28}px,${i<2?22:-22}px) scale(.94)`},{opacity:1,transform:'none'}],{duration:300,delay:i*20,easing:'cubic-bezier(.2,.75,.2,1)',fill:'backwards'});
  });
 };
 if(reduce.matches||renderedSkillIndex<0||renderedSkillIndex===index){commit(false);return}
 skillList.dataset.phase='leaving';skillList.setAttribute('aria-hidden','true');
 badges.forEach((badge,i)=>{
  badge.style.opacity='0';badge.animate([{opacity:1,transform:'none'},{opacity:0,transform:`translate(${i%2?-16:16}px,${i<2?12:-12}px) scale(.96)`}],{duration:140,easing:'ease-out'});
 });
 // New skills emerge at the midpoint of the existing 800ms cube rotation.
 skillTimer=setTimeout(()=>commit(true),400);
}
reduce.addEventListener('change',()=>{if(reduce.matches)renderCubeSkills()});
let cubeIndex=0,cubeAngle=-24,cubePointer=null,suppressCubeClick=false;
function selectCube(index){
 const nextIndex=(index+3)%3,base=-24-nextIndex*90;
 cubeAngle=base+360*Math.round((cubeAngle-base)/360);
 cubeIndex=nextIndex;cube.style.setProperty('--cube-angle',cubeAngle+'deg');
 document.querySelectorAll('.cube-dot').forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===cubeIndex));b.setAttribute('aria-label',cubeLabels[lang][i])});
 document.getElementById('cube-status').textContent=cubeLabels[lang][cubeIndex]+': '+cubeSkills[cubeIndex].join(', ');
 renderCubeSkills();
}
cubeButton.addEventListener('click',()=>{if(suppressCubeClick){suppressCubeClick=false;return}selectCube(cubeIndex+1)});
cubeButton.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();selectCube(cubeIndex+(e.key==='ArrowRight'?1:-1))}});
cubeButton.addEventListener('pointerdown',e=>{if(e.isPrimary&&e.button===0){cubePointer={id:e.pointerId,x:e.clientX,y:e.clientY};suppressCubeClick=false;cubeButton.setPointerCapture(e.pointerId)}});
cubeButton.addEventListener('pointerup',e=>{if(!cubePointer||cubePointer.id!==e.pointerId)return;const dx=e.clientX-cubePointer.x,dy=e.clientY-cubePointer.y;cubePointer=null;if(Math.abs(dx)>24&&Math.abs(dx)>Math.abs(dy)){selectCube(cubeIndex+(dx<0?1:-1));suppressCubeClick=true}if(cubeButton.hasPointerCapture(e.pointerId))cubeButton.releasePointerCapture(e.pointerId)});
cubeButton.addEventListener('pointercancel',()=>{cubePointer=null;suppressCubeClick=false});
document.querySelectorAll('.cube-dot').forEach(b=>b.addEventListener('click',()=>selectCube(Number(b.dataset.cube))));
function translateAbout(){
 document.querySelector('[data-scene="about"]').setAttribute('aria-label',lang==='ar'?'نبذة عني':'About me');
 cubeButton.setAttribute('aria-label',lang==='ar'?'تدوير المكعّب إلى المجال التالي':'Rotate cube to the next field');
 document.querySelector('.cube-controls').setAttribute('aria-label',lang==='ar'?'مجالاتي':'My disciplines');
 selectCube(cubeIndex);
}
language.addEventListener('click',translateAbout);translateAbout();

const envelopeButton=document.getElementById('envelope-button');
const contactModal=document.getElementById('contact-modal'),contactTrigger=document.getElementById('contact-trigger');
let contactScrollStyle=null,contactOpener=null;
function openContact(e){
 if(contactModal.open)return;
 contactOpener=e.currentTarget;contactScrollStyle=scenes.style.overflow;scenes.style.overflow='hidden';
 envelopeButton.setAttribute('aria-expanded','true');contactModal.showModal();
}
for(const button of [contactTrigger,envelopeButton])button.addEventListener('click',openContact);
function finishContactClose(){
 if(contactModal.open||contactScrollStyle===null)return;
 scenes.style.overflow=contactScrollStyle;contactScrollStyle=null;envelopeButton.setAttribute('aria-expanded','false');
 contactOpener?.focus({preventScroll:true});contactOpener=null;
}
function closeContact(){if(!contactModal.open)return;contactModal.close();finishContactClose()}
document.getElementById('contact-modal-close').addEventListener('click',closeContact);
contactModal.addEventListener('cancel',e=>{e.preventDefault();closeContact()});
contactModal.addEventListener('click',e=>{if(e.target===contactModal){const r=contactModal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeContact()}});
contactModal.addEventListener('close',finishContactClose);
function translateContact(){
 const ar=lang==='ar';
 document.querySelector('[data-scene="contact"]').setAttribute('aria-label',ar?'تواصل':'Contact');
 envelopeButton.setAttribute('aria-label',ar?'اختر طريقة التواصل':'Choose how to connect');
 document.getElementById('contact-modal-close').setAttribute('aria-label',ar?'إغلاق':'Close');
 [['contact-email','البريد الإلكتروني','Email'],['contact-whatsapp','واتساب','WhatsApp']].forEach(([id,a,e])=>{const el=document.getElementById(id);el.setAttribute('aria-label',ar?a:e);el.title=ar?a:e});
}
language.addEventListener('click',translateContact);translateContact();
[contactModal].forEach(dialog=>dialog.addEventListener('keydown',e=>{
 if(e.key!=='Tab')return;
 const items=[...dialog.querySelectorAll('a[href],button:not([disabled])')].filter(el=>!el.hidden&&el.getClientRects().length);
 const first=items[0],last=items[items.length-1];
 if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
 else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
}));


language.addEventListener('click',()=>{
 const path=lang==='en'?'/concept-v2/en.html':'/concept-v2/ar.html';
 history.replaceState(null,'',path+location.hash);
 document.title={"ar":"إبراهيم العجمي | Digital Product Designer","en":"Ibrahim Al-Ajmi | Digital Product Designer"}[lang];
 document.querySelector('meta[name="description"]').content={"ar":"أصمّم منتجات رقمية وتجارب واضحة، وأعمل على الجرافيك والهويات البصرية.","en":"I design digital products and clear experiences, alongside graphic design and visual identities."}[lang];
 for(const key of ['og:title','twitter:title'])document.querySelector('meta['+(key.startsWith('og:')?'property':'name')+'="'+key+'"]').content=document.title;
for(const key of ['og:description','twitter:description'])document.querySelector('meta['+(key.startsWith('og:')?'property':'name')+'="'+key+'"]').content=document.querySelector('meta[name="description"]').content;
document.querySelector('meta[property="og:url"]').content='https://ibrahim-portfolio-blush.vercel.app'+(lang==='ar'?'/ar':'/');
document.querySelector('meta[property="og:locale"]').content=lang==='ar'?'ar_SA':'en_US';
document.querySelector('link[rel="canonical"]').href='https://ibrahim-portfolio-blush.vercel.app'+(lang==='ar'?'/ar':'/');
});

function restoreSceneHash(){const id=location.hash.slice(1)||'main';if(sceneIds.includes(id)){sceneDestination=id;document.getElementById(id).scrollIntoView({behavior:'instant',block:'start'});}}
requestAnimationFrame(restoreSceneHash);window.addEventListener('hashchange',restoreSceneHash);
