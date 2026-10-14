// Fulbo a Bologna: service worker mínimo para que la app se pueda instalar.
// Red primero; si no hay conexión, muestra la última versión guardada de la página.
const CACHE='fulbo-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png']).catch(()=>{})));});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy)).catch(()=>{});return res;}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
});
