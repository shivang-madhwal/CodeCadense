const CACHE = 'recall-shell-v2';
const BASE = new URL('./', self.location).href;
const ASSETS = ['./','./index.html','./styles.css','./app.js','./core.js','./data.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'].map(p=>new URL(p,BASE).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('recall-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(response=>response.ok?response:caches.match(new URL('./index.html',BASE).href)).catch(()=>caches.match(new URL('./index.html',BASE).href)));return;
 }
 if(!ASSETS.includes(event.request.url))return;
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
