const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = fs.readFileSync('src/lib/graphic-gallery.ts', 'utf8');
const output = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const exportsObject = {};
let entries=[];
vm.runInNewContext(output, {exports:exportsObject, process:{cwd:()=>process.cwd(),env:{NODE_ENV:'production',VERCEL_ENV:'production'}}, require:(id)=> {
 if(id==='@keystatic/core/reader') return {createReader:()=>({collections:{graphicDesigns:{all:async()=>entries}}})};
 if(id==='@keystatic/core/reader/github') return {};
 if(id==='next/headers') return {draftMode:async()=>({isEnabled:false})};
 if(id==='../../keystatic.config') return {};
 throw Error(id);
}});
const {mapPublishedGraphicDesign:map,galleryFixturesEnabled:fixtures,getGraphicDesigns:get}=exportsObject;
const valid={designId:'real-design',titleEn:'Title',titleAr:'عنوان',descriptionEn:'One sentence.',descriptionAr:'سطر واحد.',entityEn:'Entity',entityAr:'جهة',category:'discord',cover:'/project-media/art.jpg',coverAltEn:'Artwork',coverAltAr:'تصميم',images:[],order:1,status:'published',contentOrigin:'real',selfInitiated:false};
test('published bilingual entry maps and self-initiated attribution is truthful',()=>{
 assert.equal(map('real-design',valid).id,'real-design');
 assert.equal(map('real-design',{...valid,cover:'/project-media/تصميم-الهوية ٢٠٢٦.png'}).cover.url,'/project-media/تصميم-الهوية ٢٠٢٦.png');
 assert.equal(map('real-design',{...valid,selfInitiated:true,entityEn:'',entityAr:''}).entity.en,'Self-initiated work');
});
test('draft hidden development and incomplete entries excluded even by slug',()=>{
 for(const patch of [{status:'draft'},{status:'hidden'},{contentOrigin:'development'},{titleAr:''},{descriptionAr:''},{entityEn:''},{coverAltAr:''},{descriptionEn:'first\nsecond'},{descriptionEn:'x'.repeat(241)}]) assert.equal(map('real-design',{...valid,...patch}),null);
});
test('unsafe image paths and invalid identifiers rejected',()=>{
 for(const cover of ['https://example.com/a.png','/project-media/../secret.png','//example.com/a.png','/project-media/x.svg','/project-media/%2e%2e/a.jpg','/project-media/a.jpg?x=1','/project-media/a.jpg#x','/project-media/a:b.jpg','/project-media/a\\b.jpg','/project-media/a\nb.jpg']) assert.equal(map('real-design',{...valid,cover}),null);
 assert.equal(map('../draft',valid),null);
 assert.equal(map('real-design',{...valid,images:[{image:'/project-media/a.jpg',altEn:'',altAr:'صورة'}]}),null);
});
test('fixture gate rejects production regardless of flags',()=>{
 assert.equal(fixtures({VERCEL_ENV:'production',GRAPHIC_GALLERY_FIXTURES:'1',VERCEL_GIT_COMMIT_REF:'feature/graphic-design-gallery'}),false);
 assert.equal(fixtures({NODE_ENV:'production',GRAPHIC_GALLERY_FIXTURES:'1'}),false);
 assert.equal(fixtures({VERCEL_ENV:'preview',VERCEL_GIT_COMMIT_REF:'feature/graphic-design-gallery'}),true);
 assert.equal(fixtures({VERCEL_ENV:'preview',VERCEL_GIT_COMMIT_REF:'other'}),false);
 assert.equal(fixtures({NODE_ENV:'development',GRAPHIC_GALLERY_FIXTURES:'1'}),true);
});
test('public query returns only published records and correct category',async()=>{
 entries=[{slug:'real-design',entry:valid},{slug:'hidden',entry:{...valid,designId:'hidden',status:'hidden'}},{slug:'other',entry:{...valid,designId:'other',category:'brand-identity'}}];
 assert.equal((await get()).length,2);
 assert.equal((await get('discord')).length,1);
 assert.equal((await get('unknown')).length,0);
});
