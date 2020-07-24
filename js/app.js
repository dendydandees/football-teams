// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => console.log('Service worker registered', reg))
      .catch((err) => console.log('Service worker not registered', err))
  })
} else {
  console.log('Service worker not supported in this browser version')
}
