var webPush = require('web-push')

const vapidKeys = {
  publicKey:
    'BHWS7dQesuOy0kyVG2hj7EO_eaFQd8n9ocJH4i9cmLq_rwNP6rhIelMNRPo61VuevEEvEANFTrm6tcLX4W27HmY',
  privateKey: 'XQ018IgDb0h680xWg7KZzgTlvZmbKESRTlP58goSZUA',
}

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/f_Q0KdPiYYM:APA91bFeT7LM8mACvwka_082UBIRuZtw5cPgHrrSq66HCEecO_2Dd6MJmkOrG7bpfxj6Lniuy3VnyewG90hwF8v6pxKXYIVvRNd9I43_8CGveX3ADOOd47bIFm1A9j0VYSRVAIONggRC',
  keys: {
    p256dh:
      'BF4eN9vO/kCW0g5sSJpHvndOAUGhYYhNMGHAkzt6Z6p7keKr8A/1oo5BBoAz+P4gr+cnHUzVM6nuxbOlS6QqmDQ=',
    auth: '8CxM+Uvzytid3MX8+ioyBg==',
  },
}
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!'

var options = {
  gcmAPIKey: '164512943645',
  TTL: 60,
}
webPush.sendNotification(pushSubscription, payload, options)
