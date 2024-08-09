const header = document.querySelector(".header");
const headerBurger = document.querySelector(".header__burger");
const headerNav = document.querySelector(".header__nav");
const headerButtons = document.querySelector(".header__button-wrp");

window.addEventListener('scroll', toggleHeaderActive)

headerBurger.addEventListener('click', toggleBurgerMenu)

function toggleHeaderActive() {
    if (scrollY > 0 && header.classList.contains('header--active')) {
        return
    } else {
        scrollY > 0 ? header.classList.add('header--active') :
            header.classList.remove('header--active')
    }
}

function toggleBurgerMenu() {
    if (!headerBurger.classList.contains('header__burger--active')) {
        headerBurger.classList.add('header__burger--active')
        headerButtons.classList.add('header__button-wrp--active')
        headerNav.classList.add('header__nav--active')
        document.body.style.overflowY = 'hidden'

    } else {
        headerBurger.classList.remove('header__burger--active')
        headerButtons.classList.remove('header__button-wrp--active')
        document.body.style.overflowY = ''
        let animationCloseNav = headerNav.animate([{ transform: 'translateX(-100%)' }], { duration: 200 })
        animationCloseNav.addEventListener('finish', function () {
            headerNav.classList.remove('header__nav--active')
        })
    }
}

const heroDropMenuBtn = document.querySelector('.hero__drop-menu-btn');
const heroDropMenuItems = document.querySelectorAll('.hero__drop-menu-item');

heroDropMenuBtn.addEventListener('click',
    toggleDropMenu
)

function toggleDropMenu() {
    let isOpen
    if (!this.classList.contains('hero__drop-menu-btn--active')) {
        this.classList.add(('hero__drop-menu-btn--active'))
    } else {
        isOpen = true
        this.classList.remove(('hero__drop-menu-btn--active'))
    }
    heroDropMenuItems.forEach(item => {
        if (!isOpen) {
            item.classList.add('hero__drop-menu-item--active')
            item.style.maxHeight = item.scrollHeight + 'px'
        } else {
            item.classList.remove('hero__drop-menu-item--active')
            item.style.maxHeight = 0
        }
    }
    )
}

class Slider {
    constructor(slider, sliderLine, slide, prevBtn, nextBtn, maxVisibleSlides, middleVisibleSlides, smallVisibleSlides) {
        this.slider = document.querySelector(slider)
        this.sliderLine = document.querySelector(sliderLine)
        this.slides = document.querySelectorAll(slide)
        this.prevBtn = document.querySelector(prevBtn)
        this.nextBtn = document.querySelector(nextBtn)
        this.maxVisibleSlides = maxVisibleSlides || 1
        this.middleVisibleSlides = middleVisibleSlides || 1
        this.smallVisibleSlides = smallVisibleSlides || 1
        this.numVisibleSlides
        this.current = 0
        this.prevBtn.addEventListener('click', () => { this.prev() })
        this.nextBtn.addEventListener('click', () => { this.next() })
        this.init()
        window.addEventListener('resize', () => { this.init() })
    }

    prev() {
        this.current == 0 ? this.current = this.slides.length - this.numVisibleSlides : --this.current
        this.rollSlider()
    }

    next() {
        this.current == this.slides.length - this.numVisibleSlides ? this.current = 0 : ++this.current
        this.rollSlider()
    }

    init() {
        this.setNumVisibleSlider()
        let sliderWidth = this.slider.clientWidth
        let slideWidth = sliderWidth / this.numVisibleSlides
        this.slides.forEach(slide => slide.style.width = slideWidth + 'px')
        this.sliderLine.style.width = slideWidth * this.slides.length + 'px'
        this.rollSlider()
    }

    setNumVisibleSlider() {
        let width = window.document.documentElement.clientWidth

        this.numVisibleSlides = width > 768 ? this.maxVisibleSlides
            : width <= 768 && width >= 450 ? this.middleVisibleSlides
                : this.numVisibleSlides = this.smallVisibleSlides
    }

    rollSlider() {
        this.sliderLine.style.transform = 'translate(-' + this.current * this.slides[0].offsetWidth + 'px)';
    }


}

class MovingSlider extends Slider {

    setTimeout = null

    playMoving() {
        this.setTimeout = setTimeout(() => {
            this.next()
            this.init()
            this.playMoving()
        }, 3000);
    }

    stopMoving() {
        clearTimeout(this.setTimeout)
    }
}

let blogSlider = new Slider('.blog__slider', '.blog__slider-line', '.blog__slide', '.blog__arrow-prev', '.blog__arrow-next', 3, 1)

let backedSlider = new MovingSlider('.backed__slider', '.backed__slider-line', '.backed__slide', '.backed__arrow-prev', '.backed__arrow-next', 5, 3, 1)

backedSlider.playMoving()

const bringsTitlesList = document.querySelector('.brings__list-titles');
const bringsTitles = bringsTitlesList.querySelectorAll('.brings__item-title');
const bringsItemTxts = document.querySelectorAll('.brings__item-txt');
const bringsItemTxtsSmMenu = document.querySelectorAll('.brings__item-txt-mobile');

bringsTitlesList.addEventListener('click', (e) => {
    let targetElem = e.target.closest('.brings__item-title')
    if (!targetElem || (isLargeScreen() && targetElem.classList.contains('brings__item-title--active'))) {
        return
    }
    else {
        bringsMenuInit(targetElem.dataset.i)
    }
})

window.addEventListener('resize', () => bringsMenuInit())
bringsMenuInit()

function bringsMenuInit(i) {
    if (isLargeScreen()) {
        deactiveBringsTitles()
        bringsItemTxts.forEach(e => {
            e.classList.remove('brings__item-txt--active')
        })
        bringsTitles[i ?? 0].classList.add('brings__item-title--active')
        bringsItemTxts[i ?? 0].classList.add('brings__item-txt--active')
    } else {
        activateBringsSmMenu(bringsTitles[i] ?? false)
    }
}

function isLargeScreen() {
    return window.document.documentElement.clientWidth >= 1024
}

function deactiveBringsTitles() {
    bringsTitles.forEach(e => {
        e.classList.remove('brings__item-title--active')
    })
}

function activateBringsSmMenu(activeTitle) {
    if (activeTitle) {
        let targetElem = activeTitle.parentNode.querySelector('.brings__item-txt-mobile')
        if (targetElem.classList.contains('brings__item-txt-mobile--active')) {
            activeTitle.classList.remove('brings__item-title--active')
            targetElem.classList.remove('brings__item-txt-mobile--active')
            targetElem.style.maxHeight = 0
        } else {
            activeTitle.classList.add('brings__item-title--active')
            targetElem.classList.add('brings__item-txt-mobile--active')
            targetElem.style.maxHeight = targetElem.scrollHeight + 'px'
        }
    } else {
        deactiveBringsTitles()
        bringsItemTxtsSmMenu.forEach(item => {
            item.classList.remove('brings__item-txt-mobile--active')
            item.style.maxHeight = 0
        })
    }
};

const planObserverBox = document.querySelector('.plan__stat-list');
const planOutValueBox = document.querySelectorAll('.plan__out-value');
let planAnimPoint = '-' + (planObserverBox.clientHeight) + 'px'

createObserver(planObserverBox, planAnimPoint, planSectionAnimation)

function planSectionAnimation() {
    animOutValue(planOutValueBox[0], 5);
    animOutValue(planOutValueBox[1], 1);
    animOutValue(planOutValueBox[2], 40);
}

const whyObserverBox = document.querySelector('.why__chart');
const whyOutValueBox = document.querySelector('.why__out-value');
const whyBarSum = document.querySelectorAll('.why__bar-sum');
const whyBar = document.querySelectorAll('.why__bar');
let whyAnimPoint = '-' + (whyObserverBox.clientHeight / 2) + 'px'

createObserver(whyObserverBox, whyAnimPoint, whySectionAnimation)

function whySectionAnimation() {
    animOutValue(whyOutValueBox, 60)
    whyBarSum.forEach(e => e.classList.add('why__bar-sum--active'));
    whyBar.forEach(e => e.classList.add('why__bar--active'));
}

function createObserver(observerBox, actionPoint = '0px', callBack) {
    let observer = new IntersectionObserver(
        ([e]) => {
            if (e.isIntersecting) {
                callBack()
                observer.disconnect(observerBox)
            }
        },
        { rootMargin: `${actionPoint}` }
    )
    observer.observe(observerBox)
}

function animOutValue(outValueBox, value) {
    let time = 1000;
    let n = 0;
    let t = Math.round(time / value);
    let interval = setInterval(() => {
        n++
        if (n == value) {
            clearInterval(interval)
        }
        outValueBox.innerHTML = n
    }, t);
}

const claimsVideo = document.querySelector('.claims__video')
const claimsVideoPlay = document.querySelector('.claims__video-play')
const claimsVideoHide = document.querySelector('.claims__video-hide')

claimsVideoPlay.addEventListener('click', () => togglePlayHideClaimsVideo(false))

function togglePlayHideClaimsVideo(isPlay) {
    if (isPlay) {
        claimsVideo.pause()
        claimsVideo.classList.remove('claims__video--active')
        claimsVideoHide.classList.remove('claims__video-hide--active')
        claimsVideoHide.removeEventListener('click', () => togglePlayHideClaimsVideo())
    } else {
        claimsVideo.classList.add('claims__video--active')
        claimsVideoHide.classList.add('claims__video-hide--active')
        claimsVideo.play()
        claimsVideoHide.addEventListener('click', () => togglePlayHideClaimsVideo(true))
    }
}






