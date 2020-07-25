// Register service worker
const registerServiceWorker = () => {
  // Check that service workers are supported
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Register Berhasil'))
        .catch(() => console.log('Register Tidak Berhasil'))
    })
  } else {
    console.log('Service Worker it is not supported!')
  }
}

const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const registerNotification = () => {
  if ('Notification' in window) {
    Notification.requestPermission().then((result) => {
      if (result === 'denied') {
        console.log('Fitur notifikasi tidak diijinkan.')
        return
      } else if (result === 'default') {
        console.error('Pengguna menutup kotak dialog permintaan ijin.')
        return
      }

      if (('PushManager' in window)) {
        navigator.serviceWorker.getRegistration().then((registration) => {
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                'BHWS7dQesuOy0kyVG2hj7EO_eaFQd8n9ocJH4i9cmLq_rwNP6rhIelMNRPo61VuevEEvEANFTrm6tcLX4W27HmY'
              ),
            })
            .then(function (subscribe) {
              console.log(
                'Berhasil melakukan subscribe dengan endpoint: ',
                subscribe.endpoint
              )
              console.log(
                'Berhasil melakukan subscribe dengan p256dh key: ',
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey('p256dh'))
                  )
                )
              )
              console.log(
                'Berhasil melakukan subscribe dengan auth key: ',
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey('auth'))
                  )
                )
              )
            })
            .catch(function (e) {
              console.error('Tidak dapat melakukan subscribe ', e.message)
            })
        });
      }
    })
  }
}

export default {
  registerServiceWorker,
  registerNotification,
}
