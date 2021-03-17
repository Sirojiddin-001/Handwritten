const cacheName = "v-app-v1";
const dinamicCacheName = "d-app-v1";
const assetUrls = [
  "/",
  "./assets/css/uikit.min.css",
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
  "./assets/js/uikit.min.js",
  "./index.html",
  "./offline.html",
];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(assetUrls);
});

self.addEventListener("activate", async (event) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== cacheName)
      .filter((name) => name !== dinamicCacheName)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(chacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function chacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}

async function networkFirst(request) {
  const cache = await caches.open(dinamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    return caches.match("./offline.html");
  }
}
