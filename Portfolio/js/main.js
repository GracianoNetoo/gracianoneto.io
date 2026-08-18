/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

const showMenu = () => {
   navMenu.classList.add('show-menu')
   document.body.style.overflow = 'hidden'
}

const hideMenu = () => {
   navMenu.classList.remove('show-menu')
   document.body.style.overflow = ''
}

if(navToggle){
   navToggle.addEventListener('click', showMenu)
}

if(navClose){
   navClose.addEventListener('click', hideMenu)
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link, .nav__hire-btn')

const linkAction = () =>{
   hideMenu()
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== RESET MENU ON RESIZE ===============*/
window.addEventListener('resize', () =>{
   if(window.innerWidth >= 969){
      hideMenu()
   }
})

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () =>{
   const header = document.getElementById('header')
   if(!header) return
   window.scrollY >= 50 ? header.classList.add('shadow-header')
                         : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== FAQ ACCORDION ===============*/
const faqItems = document.querySelectorAll('.faq__item')

faqItems.forEach(item => {
   const question = item.querySelector('.faq__question')
   if(!question) return

   question.addEventListener('click', () => {
      const isActive = item.classList.contains('active')

      faqItems.forEach(other => other.classList.remove('active'))

      if(!isActive){
         item.classList.add('active')
      }
   })
})

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = async (event) => {
   event.preventDefault()

   if (typeof emailjs === 'undefined') {
      contactMessage.textContent = 'O serviço de e-mail não foi carregado. Atualize a página e tente novamente.'
      return
   }

   try {
      await emailjs.sendForm('service_cvxgtqm', 'template_3sdmiyo', contactForm, 'bD8Jt0K8gKX3SPc4T')
      contactMessage.textContent = 'Mensagem enviada com sucesso! ✅'
      contactForm.reset()

      setTimeout(() => {
         contactMessage.textContent = ''
      }, 5000)
   } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
      contactMessage.textContent = 'Não foi possível enviar a mensagem. Tente novamente! ❌'
   }
}

if (contactForm && contactMessage) {
   contactForm.addEventListener('submit', sendEmail)
}

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
   const scrollUpBtn = document.getElementById('scroll-up')
   if (!scrollUpBtn) return
   window.scrollY >= 350 ? scrollUpBtn.classList.add('show-scroll')
                          : scrollUpBtn.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
   const scrollY = window.scrollY

   sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 80
      const sectionId = section.getAttribute('id')
      const sectionLink = document.querySelector(`.nav__link[href*=${sectionId}]`)

      if (!sectionLink) return

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
         sectionLink.classList.add('active-link')
      } else {
         sectionLink.classList.remove('active-link')
      }
   })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
   document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
   themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

if(themeButton){
   themeButton.addEventListener('click', () => {
       document.body.classList.toggle(darkTheme)
       themeButton.classList.toggle(iconTheme)
       localStorage.setItem('selected-theme', getCurrentTheme())
       localStorage.setItem('selected-icon', getCurrentIcon())
   })
}

/*=============== SCROLL REVEAL ===============*/
if (typeof ScrollReveal !== 'undefined') {
   const sr = ScrollReveal({
      origin: 'bottom',
      distance: '40px',
      duration: 1500,
      delay: 200,
      reset: false
   })

   sr.reveal('.hero__content, .hero__image', { origin: 'top', interval: 100 })
   sr.reveal('.about__title, .about__description, .about__tech-list li', { interval: 100 })
   sr.reveal('.about__image-wrapper', { origin: 'right' })
   sr.reveal('.skills__title, .skills__subtitle, .skills__row', { interval: 100 })
   sr.reveal('.testimonials__title, .testimonials__card', { interval: 150 })
   sr.reveal('.projects__title, .projects__subtitle, .projects__card', { interval: 150 })
   sr.reveal('.faq__title, .faq__subtitle, .faq__item', { interval: 100 })
   sr.reveal('.experience__title, .experience__item', { interval: 150 })
   sr.reveal('.contact__title, .contact__subtitle, .contact__form', { origin: 'bottom' })
}
