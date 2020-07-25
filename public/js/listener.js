import db from './db.js'

const pushNotification = (message) => {
  const title = 'Notifikasi'
  const options = {
    body: message,
    tag: 'message-group-1',
    renotify: true,
    badge: '/img/icon.png',
    icon: '/img/icon.png'
  }
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((reg) => {
      reg.showNotification(title, options)
    })
  } else {
    console.error('Fitur notifikasi tidak diijinkan.')
  }
}

const addSavedTeam = (id, logo, name, venue) => {
    //Add To Database
    db.saveTeam({ id, logo, name, venue })
    //Display Toast and Notification
    M.toast({ html: `${name} Berhasil Ditambahkan`, classes: 'rounded' })
    pushNotification(`Berhasil Ditambahkan ${name}`)
}

const getTeam = () => {
  //Get Saved Team From Database
  db.getSavedTeam().then((data) => {
    let teamsHTML = ''
    data.forEach((team) => {
      teamsHTML += `
            <div class="card-panel yellow team">
        <img
          src="${team.logo}"
          alt=""
          width="80"
        />
        <div class="details">
          <span class="card-title truncate">${team.name}</span>
          <p>${team.venue ? team.venue : ''}</p>
        </div>
        <div class="actions">
          <button
            class="waves-effect waves-light btn-floating right red darken-2"
            onclick = "deleteSavedTeam(${team.id},'${team.name}')"
            ><i class="material-icons">delete</i></button
          >
        </div>
      </div>
            `
    })
    if (data.length == 0)
      teamsHTML +=
        '<h6 class="center-align white-text">Belum terdapat data yang disimpan</6>'

    document.getElementById('savedteams').innerHTML = teamsHTML
  })
}

const deleteSavedTeam = (id, name) => {
  //Delete Saved Team From Database
  db.deleteSavedTeam(id)
  getTeam()
  //Display Toast and Notification
  M.toast({ html: `Berhasil Menghapus ${name}`, classes: 'rounded' })
  pushNotification(`Berhasil Menghapus ${name}`)
}

export default {
  addSavedTeam,
  getTeam,
  deleteSavedTeam
}
