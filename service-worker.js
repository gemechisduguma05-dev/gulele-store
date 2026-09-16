const CACHE_NAME = "aafdmc-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./branch.html",
  "./items.html",
  "./stock.html",
  "./reports.html",
  "./settings.html",
  "./manifest.json",
  "./1788633150526.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
