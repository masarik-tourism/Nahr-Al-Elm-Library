/*
 * Nahr Al-Elm Library (مكتبة نهر العلم - إدارة أ/ إيهاب)
 * High-Speed PWA Service Worker with Smart OTA Update Engine (v2.2.0)
 * - Bypasses .apk downloads completely so native browser downloads stream at max speed.
 * - Uses Cache-First + background revalidation for immutable CDNs & icons (instant repeat loads).
 * - Uses Fast Network-Race (1200ms) -> Cached Shell + background update for same-origin OTA files.
 */

const CACHE_VERSION = 'nahralelm-ota-v2.2.5';
const CACHE_NAME = `nahr-alelm-cache-${CACHE_VERSION}`;
const CDN_CACHE_NAME = 'nahr-alelm-cdn-v1';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icon-192.png',
  './icon-512.png'
];

const IMMUTABLE_CDN_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdn.tailwindcss.com',
  'cdnjs.cloudflare.com',
  'www.gstatic.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME && name !== CDN_CACHE_NAME && name.startsWith('nahr-alelm-')) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
      .then(() => {
        return self.clients.matchAll({ type: 'window' }).then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'OTA_UPDATE_ACTIVATED',
              version: CACHE_VERSION,
              timestamp: Date.now()
            });
          });
        });
      })
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never intercept binary APK downloads or Firebase Realtime Database streams
  if (
    url.pathname.endsWith('.apk') ||
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('firebasedatabase.app')
  ) {
    return;
  }

  const isCdnAsset = IMMUTABLE_CDN_HOSTS.some((host) => url.hostname === host);
  const isStaticIcon = url.origin === self.location.origin && /\.(png|jpg|jpeg|webp|svg|ico)$/i.test(url.pathname);

  // 1) Cache-First with background revalidation for CDNs and static icons
  if (isCdnAsset || isStaticIcon) {
    const targetCache = isCdnAsset ? CDN_CACHE_NAME : CACHE_NAME;
    event.respondWith(
      caches.open(targetCache).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const networkUpdate = fetch(request)
            .then((networkResponse) => {
              if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                cache.put(request, networkResponse.clone()).catch(() => {});
              }
              return networkResponse;
            })
            .catch(() => null);

          if (cachedResponse) {
            event.waitUntil(networkUpdate);
            return cachedResponse;
          }
          return networkUpdate.then((res) => res || new Response('', { status: 504 }));
        });
      })
    );
    return;
  }

  // 2) Core shell (HTML/JS/Manifest): Fast Network Race (1200ms) -> Instant Cache Fallback
  const isCoreShellAsset =
    request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('manifest.json') ||
    url.pathname.endsWith('/');

  if (isCoreShellAsset && url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        const networkPromise = fetch(new Request(request, { cache: 'no-cache' }))
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone()).catch(() => {});
            }
            return networkResponse;
          })
          .catch(() => null);

        return cache.match(request).then((cachedResponse) => {
          if (!cachedResponse) {
            return networkPromise.then((res) => {
              if (res) return res;
              if (request.mode === 'navigate') {
                return caches.match('./index.html') || caches.match('./');
              }
              return new Response('محتوى غير متوفر دون اتصال', {
                status: 503,
                headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
              });
            });
          }

          // Race network up to 1200ms for instant OTA update; fall back to cache if slow
          const raceWinner = Promise.race([
            networkPromise.then((res) => res || cachedResponse),
            new Promise((resolve) => setTimeout(() => resolve(cachedResponse), 1200))
          ]);
          event.waitUntil(networkPromise);
          return raceWinner;
        });
      })
    );
    return;
  }
});

self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data.type === 'CHECK_VERSION') {
    event.source?.postMessage({
      type: 'VERSION_INFO',
      version: CACHE_VERSION
    });
  }
});
