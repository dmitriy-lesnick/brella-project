const header = document.querySelector(".header");
const headerBurger = document.querySelector(".header__burger");
const headerNav = document.querySelector(".header__nav");
const headerBurgerLines = document.querySelectorAll(".header__burger-line");


window.addEventListener('scroll', () => {
    if (scrollY > 50) {
        header.classList.add('header--active');
    }
    if (scrollY < 50) {
        header.classList.remove('header--active');
    }
    scrollChangeOutValue();
})

headerBurger.addEventListener('click', () => {

    if (headerNav.className == "header__nav") {
        headerBurgerLines.forEach(e => e.classList.add("header__burger-line--active"))
        headerNav.classList.add('header__nav--transition');
    } else {
        headerBurgerLines.forEach(e => e.classList.remove("header__burger-line--active"))
        setTimeout(() => {
            headerNav.classList.remove('header__nav--transition');
        }, 450);

    }
    headerNav.classList.toggle('header__nav--active');
})


const heroDropMenuButton = document.querySelector('.hero__drop-menu-btn');
const heroDropMenuLinks = document.querySelectorAll('.hero__drop-menu-item');

heroDropMenuButton.addEventListener('click', () => {
    heroDropMenuLinks.forEach(e => {
        heroDropMenuButton.classList.toggle('hero__drop-menu-btn--active')
        if (e.className == 'hero__drop-menu-item') {
            e.classList.add('hero__drop-menu-item--active')
            let elementHeight = e.parentNode.firstChild.scrollHeight;
            e.style.maxHeight = elementHeight + 'px'
        } else {
            e.style.maxHeight = 0
            e.classList.remove('hero__drop-menu-item--active')
        }
    })
})




const backedSlider = document.querySelector('.backed__slider');
const backedSliderLine = document.querySelector('.backed__slider-line');
const backedSlides = document.querySelectorAll('.backed__slide');
const backedSlide = document.querySelector('.backed__slide')
const backedButtonPrev = document.querySelector('.backed__arrow-prev');
const backedButtonNext = document.querySelector('.backed__arrow-next');
let backedSliderCounter = 0;
const blogSlider = document.querySelector('.blog__slider');
const blogSliderLine = document.querySelector('.blog__slider-line');
const blogSlides = document.querySelectorAll('.blog__slide');
const blogSlide = document.querySelector('.blog__slide')
const blogButtonPrev = document.querySelector('.blog__arrow-prev');
const blogButtonNext = document.querySelector('.blog__arrow-next');
let blogSliderCounter = 0;

setInterval(() => {
    backedSliderCounter += 1;
    if (backedSliderCounter == backedSlides.length - 5) {
        backedSliderCounter = 0;
    }
    rollSlider(backedSliderCounter, backedSliderLine, backedSlide);
}, 5000);

window.addEventListener('resize', init);

backedAdaptationSlider();

function backedAdaptationSlider() {
    if (window.screen.availWidth >= 1024) {
        adaptationSliderSize(backedSlider, backedSlides, backedSliderLine, 5);
    }
    if (window.screen.availWidth < 1024) {
        adaptationSliderSize(backedSlider, backedSlides, backedSliderLine, 3);
    }
    if (window.screen.availWidth < 425) {
        adaptationSliderSize(backedSlider, backedSlides, backedSliderLine, 1);
    }
};

blogAdaptationSlider();

function blogAdaptationSlider() {
    if (window.screen.availWidth < 1000) {
        adaptationSliderSize(blogSlider, blogSlides, blogSliderLine, 1);
    } else {
        adaptationSliderSize(blogSlider, blogSlides, blogSliderLine, 3);
    }
};

function init() {
    backedAdaptationSlider();
    blogAdaptationSlider();
    rollSlider(backedSliderCounter, backedSliderLine, backedSlide);
    rollSlider(blogSliderCounter, blogSliderLine, blogSlide);
    changeActiveClass();
}

function adaptationSliderSize(slider, slides, line, slidesSum) {
    let sliderWidth = slider.offsetWidth;
    let slideWidth = sliderWidth / slidesSum;
    line.style.width = slideWidth * slides.length + "px";
    slides.forEach(e => {
        e.style.width = slideWidth + 'px';
        e.style.height = 'auto';
    })
};


function rollSlider(counter, line, slide) {
    line.style.transform = 'translate(-' + counter * slide.offsetWidth + 'px)';
};

backedButtonNext.addEventListener('click', () => {
    if (backedSliderCounter < backedSlides.length - 5) {
        backedSliderCounter += 1;
        rollSlider(backedSliderCounter, backedSliderLine, backedSlide);
    }
    else {
        backedSliderCounter = 0;
        rollSlider(backedSliderCounter, backedSliderLine, backedSlide);
    }
});

backedButtonPrev.addEventListener('click', () => {
    if (backedSliderCounter > 0) {
        backedSliderCounter -= 1;
        rollSlider(backedSliderCounter, backedSliderLine, backedSlide);
    }
    else {
        backedSliderCounter = backedSlides.length - 5
        rollSlider(backedSliderCounter, backedSliderLine, backedSlide);
    }
});

blogButtonNext.addEventListener('click', () => {
    if (screen.availWidth >= 1000) {
        if (blogSliderCounter < blogSlides.length - 3) {
            blogSliderCounter += 1;
            rollSlider(blogSliderCounter, blogSliderLine, blogSlide);
        }
        else {
            blogSliderCounter = 0;
            rollSlider(blogSliderCounter, blogSliderLine, blogSlide);
        }
    } else {
        if (blogSliderCounter < blogSlides.length - 1) {
            blogSliderCounter += 1;
            rollSlider(blogSliderCounter, blogSliderLine, blogSlide);
        }
        else {
            blogSliderCounter = 0;
            rollSlider(blogSliderCounter, blogSliderLine, blogSlide);
        }
    }


});

blogButtonPrev.addEventListener('click', () => {
    if (screen.availWidth >= 1000) {
        if (blogSliderCounter > 0) {
            blogSliderCounter -= 1;
            rollSlider(blogSliderCounter, blogSliderLine, blogSlide);
        }
        else {
            blogSliderCounter = blogSlides.length - 3
            rollSlider(blogSliderCounter, blogSliderLine, blogSlide);
        }
    } else {
        if (blogSliderCounter > 0) {
            blogSliderCounter -= 1;
            rollSlider(blogSliderCounter, blogSliderLine, blogSlide);
        }
        else {
            blogSliderCounter = blogSlides.length - 1
            rollSlider(blogSliderCounter, blogSliderLine, blogSlide);
        }
    }

});


const bringsItemTitles = document.querySelectorAll('.brings__item-title');
const bringsItemTxts = document.querySelectorAll('.brings__item-txt');
const bringsItemTxtsMobile = document.querySelectorAll('.brings__item-txt-mobile');


bringsItemTitles.forEach(title => {
    title.addEventListener('click', () => {
        titleСlassСhange(title);
        if (window.screen.availWidth >= 1024) {
            txtСlassСhange(title);
        } else {
            activateBringsMobile(title);
        }
    });
});

function titleСlassСhange(e) {
    if (window.screen.availWidth < 1024) {
        if (e.className == "brings__item-title") {
            e.classList.add('brings__item-title--active')
        } else {
            e.classList.remove('brings__item-title--active')
        };
    } else {
        bringsItemTitles.forEach(title => {
            title.classList.remove('brings__item-title--active')
        });
        e.classList.add('brings__item-title--active');
    }
};


function txtСlassСhange(e) {
    bringsItemTxts.forEach(e => e.classList.remove('brings__item-txt--active'));
    bringsItemTxts[e.dataset.number].classList.add('brings__item-txt--active');
};

function activateBringsMobile(e) {
    let textElement = e.parentNode.lastElementChild
    if (textElement.className == 'brings__item-txt-mobile') {
        textElement.classList.add('brings__item-txt-mobile--active')
        textElement.style.maxHeight = textElement.scrollHeight + 'px'
    } else {
        textElement.classList.remove('brings__item-txt-mobile--active')
        textElement.style.maxHeight = 0
    }

};


(function addActiveClass() {
    if (window.screen.availWidth >= 1024) {
        bringsItemTitles[0].classList.add('brings__item-title--active')
    }
}());


function changeActiveClass() {

    if (window.screen.availWidth >= 1024) {
        bringsItemTitles.forEach(e => e.classList.remove('brings__item-title--active'));
        bringsItemTxts.forEach(e => e.classList.remove('brings__item-txt--active'));
        bringsItemTitles[0].classList.add('brings__item-title--active');
        bringsItemTxts[0].classList.add('brings__item-txt--active');
    } else {
        bringsItemTitles.forEach(e => e.classList.remove('brings__item-title--active'));
        bringsItemTxtsMobile.forEach(e => {
            e.classList.remove('brings__item-txt-mobile--active');
            e.style.maxHeight = 0;
        });
    }
};

const whyBarSum = document.querySelectorAll('.why__bar-sum');
const whyBar = document.querySelectorAll('.why__bar');

const valueWhy = document.querySelector('.why__chart-stat');
const wrpValuePlan = document.querySelector('.plan__stat-item');
const valuePlan = document.querySelector('.plan__stat-value');

function outValue(value, elem, string) {
    let time = 1000;
    let el = document.querySelector('#' + elem);
    let n = 0;
    let t = Math.round(time / value);
    let interval = setInterval(() => {
        n++
        if (n == value) {
            clearInterval(interval)
        }
        el.innerHTML = n + string;
    }, t);
}

let valueWhyPosition = valueWhy.getBoundingClientRect().top
let valueWhyHeight = valueWhy.offsetHeight
let valueWhyAnimPoint = window.innerHeight - valueWhyHeight;

let wrpValuePlanPosition = wrpValuePlan.getBoundingClientRect().top
let wrpValuePlanHeight = wrpValuePlan.offsetHeight
let wrpValuePlanAnimPoint = window.innerHeight - (wrpValuePlanHeight);


scrollChangeOutValue();

function scrollChangeOutValue() {
    if (valueWhy.innerHTML[0] != 0 && valuePlan.innerHTML[0] != 0) {
        console.log('ll')
        return
    };

    if (valueWhy.innerHTML[0] == 0 && scrollY > (valueWhyPosition - valueWhyAnimPoint)) {
        outValue(60, 'out-0', '%');
        whyBarSum.forEach(e => e.classList.add('why__bar-sum--active'));
        whyBar.forEach(e => e.classList.add('why__bar--active'));

    };

    if (valuePlan.innerHTML[0] == 0 && scrollY > (wrpValuePlanPosition - wrpValuePlanAnimPoint)) {
        console.log(scrollY)
        outValue(5, 'out-1', 'K');
        outValue(1, 'out-2', 'X');
        outValue(40, 'out-3', '%');
    };

};








