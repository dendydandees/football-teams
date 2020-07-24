import loadPage from './page.js'

// Mengaktifkan sidebar navigation
const loadNavigation = () => {
  // Inisialisasi Side Navigation
  const elements = document.querySelectorAll('.sidenav')
  M.Sidenav.init(elements, { edge: 'right' })

  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
      if (xhttp.status != 200) return

      // Memuat daftar tautan menu
      document.querySelectorAll('.topnav, .sidenav').forEach((element) => {
        element.innerHTML = xhttp.responseText
      })

      // Mendaftarkan event listener
      document
        .querySelectorAll('.sidenav a, .topnav a')
        .forEach((element) => {
          element.addEventListener('click', (event) => {
            // Tutup side navigation
            let sidenav = document.querySelector('.sidenav')
            M.Sidenav.getInstance(sidenav).close()

            // Memuat halaman
            const page = event.target.getAttribute('href').substr(1)
            loadPage(page)
          })
        })
    }
  }
  xhttp.open('GET', './components/navigation.html', true)
  xhttp.send()
}

export default loadNavigation
