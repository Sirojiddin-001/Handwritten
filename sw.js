const cacheName = "app-v1";
const staticAssets = [
  "/",
  "./assets/css/style.css",
  "./assets/fonts/fa-light-300.ttf",
  "./assets/fonts/Abram.ttf",
  "./assets/fonts/Anselmo.ttf",
  "./assets/fonts/Benvolio.ttf",
  "./assets/fonts/Capuletty.ttf",
  "./assets/fonts/Djiovanni.ttf",
  "./assets/fonts/Eskal.ttf",
  "./assets/fonts/Gregory.ttf",
  "./assets/fonts/Lexa.ttf",
  "./assets/fonts/Lorenco.ttf",
  "./assets/fonts/Merk.ttf",
  "./assets/fonts/Montekky.ttf",
  "./assets/fonts/Pag.ttf",
  "./assets/fonts/Paris.ttf",
  "./assets/fonts/Roboto.ttf",
  "./assets/fonts/Salavat.ttf",
  "./assets/fonts/Samson.ttf",
  "./assets/fonts/shriftone.ttf",
  "./assets/fonts/Stefano.ttf",
  "./assets/img/logo.png",
  "./assets/img/Page1.png",
  "./assets/img/Page2.png",
  "./assets/img/Page1_line.png",
  "./assets/img/Page2_line.png",
  "./assets/js/main.min.js",
  "./assets/js/header.min.js",
  "./assets/js/script.min.js",
  "./assets/js/firebase.min.js",
  "./index.html",
  "./offline.html",
];

self.addEventListener("install", async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener("activate", async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== cacheName)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (event.request.mode === "navigate") {
    return event.respondWith(
      fetch(event.request).catch(() => caches.match("./offline.html"))
    );
  }
  if (url.origin === location.origin) {
    event.respondWith(chacheFirst(request));
  }
});

async function chacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}
