self.addEventListener('install', event => {
  console.log('Service worker instalado');
  event.waitUntil(
    caches.open('iva-calc-cache').then(cache => {
      return cache.addAll([
        './index.html',
        './script.js',
        './style.scss',
        './manifest.json',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
