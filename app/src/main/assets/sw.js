/*
 * Nahr Al-Elm Library (مكتبة نهر العلم - إدارة أ/ إيهاب)
 * High-Reliability Progressive Web App Service Worker with Real-Time OTA Update Engine
 * Forces HTTP revalidation (cache: 'no-cache') on Network-First fetches so any update
 * pushed to GitHub Pages is pulled immediately by both mobile browsers and the Android APK.
 */

const CACHE_VERSION = 'nahralelm-ota-v2.0.1';
const CACHE_NAME = `nahr-alelm-cache-${CACHE_VERSION}`;

// الملفات الأساسية المطلوبة للتشغيل بدون إنترنت
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

// تثبيت Service Worker وتخزين النسخة الاحتياطية وتفعيلها فوراً
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

// تفعيل التحديث الجديد فوراً ومسح أي كاش قديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME && name.startsWith('nahr-alelm-')) {
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

// استراتيجية Network-First مع إعادة التحقق الإجباري من السيرفر (no-cache)
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isCoreShellAsset =
    request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('manifest.json') ||
    url.pathname.endsWith('/');

  // إجبار الشبكة على فحص التحديثات الجديدة من GitHub Pages عند كل فتح للتطبيق
  const fetchPromise = isCoreShellAsset
    ? fetch(new Request(request, { cache: 'no-cache' }))
    : fetch(request);

  event.respondWith(
    fetchPromise
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            if (url.origin === self.location.origin || url.protocol.startsWith('http')) {
              cache.put(request, responseToCache).catch(() => {});
            }
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // العودة للنسخة المخزنة محلياً عند انقطاع الإنترنت فقط
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (request.mode === 'navigate') {
            return caches.match('./index.html') || caches.match('./');
          }
          return new Response('محتوى غير متوفر دون اتصال', {
            status: 503,
            statusText: 'Service Unavailable Offline',
            headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
          });
        });
      })
  );
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
