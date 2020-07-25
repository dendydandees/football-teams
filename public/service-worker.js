importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
)

workbox.setConfig({ debug: false })

const { precacheAndRoute } = workbox.precaching
const { registerRoute } = workbox.routing
const { StaleWhileRevalidate, CacheFirst } = workbox.strategies
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { ExpirationPlugin } = workbox.expiration

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)

  precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/components/navigation.html', revision: '1' },
    { url: '/pages/standings.html', revision: '1' },
    { url: '/pages/teams.html', revision: '1' },
    { url: '/pages/favoriteteams.html', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/app.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/listener.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/navigation.js', revision: '1' },
    { url: '/js/page.js', revision: '1' },
    { url: '/js/splash.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/push.js', revision: '1' },
    { url: '/js/pwa.js', revision: '1' },
    { url: '/css/styles.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/img/icon.png', revision: '1' },
    {
      url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      revision: '1',
    },
  ])

  // Caching Image
  registerRoute(
    /\.(?:png|jpg|jpeg|svg)$/,
    new CacheFirst({
      cacheName: 'images-resources',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxEntries: 150,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    })
  )

  // Caching Data
  registerRoute(
    new RegExp('https://api.football-data.org/v2/competitions/'),
    new StaleWhileRevalidate()
  )

  // Caching Google Font
  registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    new StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    })
  )

  registerRoute(
    /\.(?:js|css)$/,
    new StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  )

  registerRoute(
    new RegExp('/pages/'),
    new StaleWhileRevalidate({
      cacheName: 'pages-resources',
    })
  )

} else {
  console.log(`Boo! Workbox didn't load 😬`)
}

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
