/*
 * Nahr Al-Elm Library (مكتبة نهر العلم - إدارة أ/ إيهاب)
 * High-Reliability Progressive Web App Service Worker with OTA Update Engine
 * Network-First Strategy for Instant Over-The-Air Caching and Resilient Offline Support
 */

const CACHE_VERSION = 'nahralelm-ota-v1.0.5';
const CACHE_NAME = `nahr-alelm-cache-${CACHE_VERSION}`;

// Core assets required for initial offline bootstrap
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

// Install event: Pre-cache core shell assets and activate immediately
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker installing version:', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching core application shell assets');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache non-fatal warning:', err);
      });
    }).then(() => {
      // Force the waiting service worker to become the active service worker
      return self.skipWaiting();
    })
  );
});

// Activate event: Clean up old legacy caches and claim active clients immediately
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker activated. Claiming clients for version:', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME && name.startsWith('nahr-alelm-')) {
            console.log('[SW] Deleting obsolete cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      // Take control of all pages within scope immediately
      return self.clients.claim();
    }).then(() => {
      // Broadcast activation and version to all open clients
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

// Fetch event: Network-First Strategy with Cache Fallback for dynamic OTA updates
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Handle only GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle HTTP/HTTPS requests
  const url = new URL(request.url);

  // Network-First strategy
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        // Validate network response
        if (networkResponse && networkResponse.status === 200) {
          // Clone and update runtime cache in background
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            // Only cache same-origin or trusted assets
            if (url.origin === self.location.origin || url.protocol.startsWith('http')) {
              cache.put(request, responseToCache).catch(() => {});
            }
          });
        }
        return networkResponse;
      })
      .catch((error) => {
        console.warn('[SW] Network request failed. Falling back to local offline cache for:', request.url);
        // Fallback to cache if network is unavailable
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If navigation request (HTML), fallback to root index.html
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

// Listen for messages from frontend clients (e.g., skipWaiting or version checks)
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    console.log('[SW] SKIP_WAITING received. Activating new worker...');
    self.skipWaiting();
  }

  if (event.data.type === 'CHECK_VERSION') {
    event.source?.postMessage({
      type: 'VERSION_INFO',
      version: CACHE_VERSION
    });
  }
});
