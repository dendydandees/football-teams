const CACHE_NAME = 'football-app v1'
let cacheUrl = [
  '/',
  '/index.html',
  '/manifest.json',
  '/components/navigation.html',
  '/pages/standings.html',
  '/pages/teams.html',
  '/pages/favoriteteams.html',
  '/js/materialize.min.js',
  '/js/api.js',
  '/js/app.js',
  '/js/db.js',
  '/js/listener.js',
  '/js/main.js',
  '/js/navigation.js',
  '/js/page.js',
  '/js/splash.js',
  '/js/idb.js',
  '/js/push.js',
  '/js/pwa.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/icon.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(cacheUrl)
    })
  )
})

self.addEventListener('activate',(event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            console.log('ServiceWorker: cache ' + cacheName + ' dihapus')
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', (event) => {
  let base_url = 'https://api.football-data.org/v2/competitions/'

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const response = await fetch(event.request)
        cache.put(event.request.url, response.clone())
        return response
      })
    )
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then((response) => {
          return response || fetch(event.request)
        })
    )
  }
})

self.addEventListener('push', (event) => {
  let body
  if (event.data) {
    body = event.data.text()
  } else {
    body = 'Push message no payload'
  }
  var options = {
    body: body,
    icon: 'img/icon.png',
    tag: 'message-group-1',
    renotify: true,
    badge: '/img/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  }
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  )
})
