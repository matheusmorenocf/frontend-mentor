const btnHamb = document.querySelector(".mobilie-menu")
const navBar = document.querySelector('nav')

btnHamb.addEventListener('click', function (){
  navBar.classList.toggle('active')
})