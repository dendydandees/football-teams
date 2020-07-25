import api from './api.js'
import listener from './listener.js'

// Memuat konten halaman
const loadPage = (page) => {
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
      let content = document.querySelector('#body-content')

      if (page === 'standings') {
        api.getStandings()
      } else if (page === 'teams') {
        api.getTeams()
        window.addSavedTeam = listener.addSavedTeam
      } else if (page === 'favoriteteams') {
        listener.getTeam()
        window.deleteSavedTeam = listener.deleteSavedTeam
      }

      if (xhttp.status == 200) {
        content.innerHTML = xhttp.responseText
      } else if (xhttp.status == 404) {
        content.innerHTML = '<p>Halaman tidak ditemukan.</p>'
      } else {
        content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>'
      }
    }
  }
  xhttp.open('GET', `/pages/${page}.html`, true)
  xhttp.send()
}

export default loadPage
