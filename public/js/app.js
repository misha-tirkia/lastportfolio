const burger = document.querySelector('.burger')
const nav = document.getElementsByClassName('navbar')[0]

burger.addEventListener('click', () => {
    nav.classList.toggle('active')
    burger.classList.toggle('active')
})

nav.addEventListener('click', () => {
    nav.classList.remove('active')
    burger.classList.remove('active')
})

let animatedel = document.querySelector('.text')
let animatedel2 = document.querySelector('.css')
let animatedel3 = document.querySelector('.js')
let animatedel4 = document.querySelector('.html')
let animatedel5 = document.querySelector('.pete')
let animatedel7 = document.querySelector('.emain')
let animatedel8 = document.querySelector('.messain')

let obser = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animation')

            if (entry.target === animatedel3 ) {
                entry.target.classList.add('animation3')
            } 

            if (entry.target === animatedel4) {
                entry.target.classList.add('animation2')
            } 
            if (entry.target === animatedel5) {
                entry.target.classList.add('animation5')
            }
            if(entry.target === animatedel7) {
                entry.target.classList.add('animation7')
            }
            if(entry.target === animatedel8) {
                entry.target.classList.add('animation8')
            }
        } else {
            entry.target.classList.remove('animation7')
            entry.target.classList.remove('animation8')
            entry.target.classList.remove('animation')
            entry.target.classList.remove('animation3')
            entry.target.classList.remove('animation2')
            entry.target.classList.remove('animation5')
        }
    })
})


obser.observe(animatedel)
obser.observe(animatedel2)
obser.observe(animatedel3)
obser.observe(animatedel4)
obser.observe(animatedel5)
obser.observe(animatedel7)
obser.observe(animatedel8)