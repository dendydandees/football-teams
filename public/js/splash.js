// splash screen
const splashScreen = () => {
  const splash = document.querySelector('.splash')
  setTimeout(() => {
    splash.classList.add('display-none')
  }, 1000);
}

export default splashScreen
