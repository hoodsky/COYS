"use strict";

// скрипт для вставки шапки и подвала на страницу
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
// скрипт для вставки шапки и подвала на страницу
includeHTML();

// предзагрузка страницы

window.onload = function () {
    document.body.classList.add('loaded_hiding');

    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);

    // Создание навигации на слайдере
    generateInd();
}

//hamburger menu
let hamburger = document.querySelector(".hamburger__icon");
let hamburgerLinks = document.querySelector(".hamburger__links");
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    hamburgerLinks.classList.toggle('active');
    document.body.classList.toggle('notscroll')
});

//поиск

let searchIcon = document.querySelector('.search-icon');
let searchInput = document.querySelector('.header__search');
let searchSpan = document.querySelector('.search-span');
let logo = document.querySelector('.header__logo');

searchIcon.addEventListener('click', () => {
    searchInput.classList.toggle('active');
    searchSpan.classList.toggle('active');
    logo.classList.toggle('active');
});

//слайдер

let slides = document.querySelectorAll('.slide');
let carouselTrack = document.querySelector('.slider__slides');
let dotsList = document.querySelector('.slider__dots');
let dots = document.querySelectorAll('.dot');
let activeSlideIndex = 0;
let imgWidth = slides[activeSlideIndex].clientWidth;
let pageSlides = Math.round((slides.length * imgWidth) / window.innerWidth);

const updateInd = () => {
    let dots = document.querySelectorAll('.dot');
    dots.forEach((el, idx) => {
        el.classList.remove('active');
        if (idx === activeSlideIndex) {
            el.classList.add('active');
        }
    })
};

// создание точек

const generateInd = () => {
    for (let i = 0; i < pageSlides; i++) {
        let newItem = document.createElement('li');
        newItem.classList.add('dot');
        newItem.setAttribute('data-index', i);
        dotsList.appendChild(newItem);
        console.log('generate');
        updateInd();
    }
}

// window.addEventListener('resize', deleteDots);

const moveSlide = dir => {
    if (dir === 'prev') {
        if (activeSlideIndex > 0) {
            activeSlideIndex--;
        } else {
            activeSlideIndex = pageSlides - 1;
        }
    } else if (dir === 'next') {
        if (activeSlideIndex < pageSlides - 1) {
            activeSlideIndex++
        } else {
            activeSlideIndex = 0;
        }
    }

    carouselTrack.style.transform = `translateX(-${activeSlideIndex * window.innerWidth
        }px)`;
    updateInd();
}
const moveSlides = idx => {
    let diff = idx - activeSlideIndex;
    if (diff >= 0) {
        for (let i = 0; i < diff; i++) {
            moveSlide("next");
        }
    } else {
        diff *= -1;
        for (let i = 0; i < diff; i++) {
            moveSlide('prev');
        }
    }
}
dotsList.addEventListener('click', e => {
    let target = e.target;
    if (target.classList.contains('dot')) {
        moveSlides(target.dataset.index);
    }
});

//автопроигрывание слайдера

let autoplayInterval = () => {
    if (activeSlideIndex > 0 || activeSlideIndex <= pageSlides) {
        moveSlide('next');
    }
};

setInterval(autoplayInterval, 5000);

//проверка ввода текста для активации кнопки

function checkInput() {
    let tel = document.querySelector('.telnumber');
    let but = document.querySelector('.telsubmit');

    tel.addEventListener('input', function () {
        but.disabled = (tel.validity.valid != true);
    });
}

checkInput();

//появление кнопки scroll-top

let but = document.querySelector('.scroll-top')

window.onscroll = () => {
    if (window.scrollY >= 200 || window.pageYOffset >= 200) {
        but.classList.remove('hide');
        // console.log('scroll');
    }
    else {
        but.classList.add('hide');
    }
}

but.addEventListener('click', () => {
    window.scrollTo({
        top: 0
    });
})

const header = document.querySelector('.header');
let windowPos = 0;
window.addEventListener('scroll', () => {
    if (window.scrollY > windowPos) {
        windowPos = window.scrollY;
        header.classList.add('hide')
    }
    else {
        windowPos = window.scrollY;
        header.classList.remove('hide')
    }
})

// Calculate 1vh value in pixels
// based on window inner height
var vh = window.innerHeight * 0.01;

// Set the CSS variable to the root element
// Which is equal to 1vh
document.documentElement.style.setProperty('--vh', vh + 'px');