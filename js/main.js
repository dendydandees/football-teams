import splashScreen from './splash.js'
import loadNavigation from './navigation.js'
import loadPage from './page.js'
import pwa from './pwa.js'

let page = window.location.hash.substr(1)
if (page === '') page = 'standings'

document.addEventListener('DOMContentLoaded', () => {

  splashScreen()
  loadNavigation()
  loadPage(page)
})

if (!('serviceWorker' in navigator)) {
  console.log('Service worker tidak didukung browser ini.')
} else {
  pwa.registerServiceWorker()
  pwa.registerNotification()
}
