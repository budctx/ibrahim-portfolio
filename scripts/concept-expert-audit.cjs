/* Independent evidence collector. Findings are data, never visual approval. */
const {chromium}=require('playwright');
const AxeBuilder=require('@axe-core/playwright').default;
const fs=require('node:fs');
const {execSync}=require('node:child_process');
const base=process.env.CONCEPT_BASE_URL||'http://127.0.0.1:3201';
const dir='qa-20261124';fs.mkdirSync(dir,{recursive:true});
const sizes=[[320,568],[360,667],[390,844],[430,844],[768,1024],[1024,768],[1440,900],[1920,1080],[844,390],[390,568],[390,667],[1440,568]];
const ids=['main','work','approach','about','contact'];
const out={commit:execSync('git rev-parse HEAD',{encoding:'utf8'}).trim(),base,mode:'Chromium emulation, reduced motion matrix; normal motion stress separately',runs:[],stress:[],noJS:[]};
const save=()=>fs.writeFileSync(dir+'/results.json',JSON.stringify(out,null,2));
async function scene(page,id){await page.locator('[data-scene='+id+']').click();await page.waitForFunction(id=>document.querySelector('#'+id).classList.contains('is-active')&&Math.abs(document.querySelector('#'+id).getBoundingClientRect().top)<2,id);}
(async()=>{const browser=await chromium.launch({headless:true});
try{
for(const [w,h] of sizes)for(const lang of ['ar','en']){
 const context=await browser.newContext({viewport:{width:w,height:h},isMobile:w<500,hasTouch:w<500,reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const run={w,h,lang,scenes:[],errors};out.runs.push(run);save();
 await page.goto(base+'/concept-v2/'+lang+'.html',{waitUntil:'networkidle'});
 for(const id of ids){
  await scene(page,id);
  await page.locator('#'+id+' img').evaluateAll(xs=>Promise.all(xs.map(im=>im.decode().catch(()=>{}))));
  const metrics=await page.locator('#'+id).evaluate(e=>{const r=e.getBoundingClientRect();return {height:r.height,scrollHeight:e.scrollHeight,overflow:e.scrollHeight>e.clientHeight+2,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth,inert:e.inert,hash:location.hash,active:document.querySelector('.scene-dot[aria-current=true]')?.dataset.scene,text:[...e.querySelectorAll('h1,h2,h3,h4,p,a,button')].filter(x=>{const s=getComputedStyle(x);return s.visibility!=='hidden'&&s.display!=='none'}).map(x=>{const b=x.getBoundingClientRect();return {tag:x.tagName,text:x.textContent.trim().slice(0,70),font:getComputedStyle(x).fontSize,clipped:b.bottom>r.bottom+2||b.top<r.top-2||b.left<r.left-2||b.right>r.right+2}}),images:[...e.querySelectorAll('img')].map(x=>({src:x.getAttribute('src')?.slice(0,90),loaded:x.complete&&x.naturalWidth>0,natural:[x.naturalWidth,x.naturalHeight],render:[x.clientWidth,x.clientHeight]}))}});
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  run.scenes.push({id,...metrics,axe:axe.violations});
  await page.screenshot({path:`${dir}/${lang}-${w}x${h}-${id}.png`});save();
 }
 await page.locator('#contact-trigger').click();run.modal={open:await page.locator('#contact-modal').evaluate(e=>e.open),axe:(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations};
 run.modal.focusCycle=[];for(let t=0;t<4;t++){await page.keyboard.press('Tab');run.modal.focusCycle.push(await page.evaluate(()=>({id:document.activeElement.id,inside:document.querySelector('#contact-modal').contains(document.activeElement)})));}
 await page.keyboard.press('Escape');run.modal.restored=await page.locator('#contact-trigger').evaluate(e=>e===document.activeElement);
 await page.goto(base+'/concept-v2/gallery.html?lang='+lang,{waitUntil:'networkidle'});
 await page.locator('.glb-item').last().scrollIntoViewIfNeeded();await page.locator('.glb-item img').evaluateAll(xs=>Promise.all(xs.map(im=>im.decode().catch(()=>{}))));
 run.galleryImages=await page.locator('.glb-item img').evaluateAll(xs=>xs.map(x=>({src:x.getAttribute('src'),loaded:x.complete&&x.naturalWidth>0,ratio:x.naturalWidth/x.naturalHeight,display:x.clientWidth/x.clientHeight})));
 run.galleryAxe=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations;
 await page.screenshot({path:`${dir}/${lang}-${w}x${h}-gallery.png`,fullPage:true});
 await page.locator('.glb-item').first().click();await page.keyboard.press('ArrowRight');run.galleryCounter=await page.locator('#counter').textContent();
 run.lightboxAxe=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations;
 await page.screenshot({path:`${dir}/${lang}-${w}x${h}-lightbox.png`});
 const blank=await page.locator('#bigImage').evaluate(e=>{const r=e.getBoundingClientRect(),ratio=e.naturalWidth/e.naturalHeight;return r.width/r.height<ratio?{x:r.x+r.width/2,y:r.y+2}:{x:r.x+2,y:r.y+r.height/2};});await page.mouse.click(blank.x,blank.y);run.backdropClosed=await page.locator('#lightbox').evaluate(e=>!e.open);
 await page.keyboard.press('Escape');run.galleryFocus=await page.locator('.glb-item').first().evaluate(e=>e===document.activeElement);
 await page.locator('#language').click();run.galleryLanguage=await page.locator('html').getAttribute('lang');await page.locator('#back').click();await page.waitForFunction(()=>document.querySelector('#work')?.classList.contains('is-active'));run.galleryBack=await page.evaluate(()=>({hash:location.hash,lang:document.documentElement.lang}));save();await context.close();
}
// Real browser touch input, before/after against an immutable deployed baseline.
out.swipes=[];
for(const lang of ['ar','en'])for(const target of [{name:'after',url:base}]){
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const page=await context.newPage();await page.goto(target.url+'/concept-v2/gallery.html?lang='+lang);await page.locator('.glb-item').first().click();
 const box=await page.locator('#bigImage').boundingBox(),cdp=await context.newCDPSession(page),y=box.y+box.height/2;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x+box.width*.75,y}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:box.x+box.width*.25,y}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 out.swipes.push({lang,target:target.name,gesture:'swipe left',counter:await page.locator('#counter').textContent(),expected:lang==='ar'?'04 / 04':'02 / 04'});save();await context.close();
}
for(const lang of ['ar','en']){
 const context=await browser.newContext({viewport:{width:390,height:844}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/concept-v2/'+lang+'.html');const stress={lang,errors,hero:[],cube:[],hash:[]};out.stress.push(stress);
 // Arrival starts outside the viewport. Wait for its own finite animation,
 // while retaining the deliberate infinite sway of its child.
 await page.waitForFunction(()=>document.querySelector('.rig').getAnimations().every(a=>a.playState!=='running'));
 for(let i=0;i<6;i++){
  await page.waitForFunction(()=>document.querySelector('#card').getAnimations().every(a=>a.playState!=='running'));
  const cardBox=await page.locator('#card').boundingBox();await page.mouse.click(cardBox.x+cardBox.width/2,cardBox.y+cardBox.height/2);
  await page.waitForTimeout(40);stress.hero.push(await page.locator('#card').getAttribute('aria-pressed'));
 }
 stress.heroEachClickToggles=stress.hero.every((value,i)=>i===0||value!==stress.hero[i-1]);

 for(const id of ids){await scene(page,id);stress.hash.push(await page.evaluate(()=>({hash:location.hash,active:document.querySelector('.scene.is-active').id})));await page.reload();await page.waitForFunction(id=>document.querySelector('#'+id).classList.contains('is-active'),id);}
 await scene(page,'about');for(let i=0;i<9;i++){await page.locator('#cube-control').click();}await page.waitForTimeout(900);stress.cube=await page.locator('.cube-dot').evaluateAll(xs=>xs.map(x=>x.getAttribute('aria-pressed')));
 await scene(page,'main');await page.locator('#language').click();stress.language=await page.evaluate(()=>({lang:document.documentElement.lang,url:location.pathname,hash:location.hash}));
 await scene(page,'work');await scene(page,'contact');await page.goBack();await page.waitForTimeout(1000);stress.back=await page.evaluate(()=>({hash:location.hash,active:document.querySelector('.scene.is-active').id}));
 const session=await context.newCDPSession(page);await session.send('Performance.enable');
 stress.heapBefore=(await session.send('Performance.getMetrics')).metrics.filter(m=>['JSHeapUsedSize','Nodes','JSEventListeners'].includes(m.name));
 for(let cycle=0;cycle<3;cycle++)for(const id of ids)await scene(page,id);
 stress.heapAfter=(await session.send('Performance.getMetrics')).metrics.filter(m=>['JSHeapUsedSize','Nodes','JSEventListeners'].includes(m.name));
 await scene(page,'about');await page.locator('#cube-control').click();
 stress.frameScene='about with floating skills and cube transition';
 stress.frames=await page.evaluate(()=>new Promise(resolve=>{const intervals=[];let previous=performance.now();function tick(now){intervals.push(now-previous);previous=now;if(intervals.length<120)requestAnimationFrame(tick);else resolve({count:intervals.length,meanMs:intervals.reduce((a,b)=>a+b,0)/intervals.length,maxMs:Math.max(...intervals),over33ms:intervals.filter(n=>n>33).length});}requestAnimationFrame(tick);}));
 stress.animations=await page.evaluate(()=>document.getAnimations().map(a=>({playState:a.playState,target:a.effect?.target?.className})));
 await page.screenshot({path:`${dir}/${lang}-normal-motion.png`});save();await context.close();
 const no=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const np=await no.newPage();await np.goto(base+'/concept-v2/gallery.html?lang='+lang);out.noJS.push({lang,galleryButtons:await np.locator('.glb-item').count(),fallbackLinks:await np.locator('.glb-fallback a').count()});await np.screenshot({path:`${dir}/${lang}-nojs-gallery.png`,fullPage:true});await no.close();save();
}
}finally{save();await browser.close();}})().catch(e=>{out.error=e.stack;save();process.exitCode=1;});
