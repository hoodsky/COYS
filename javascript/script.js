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
}

//слайдер

const slides = document.querySelectorAll('.slide');
const carouselTrack = document.querySelector('.slider__slides');
const dotsList = document.querySelector('.slider__dots');

let activeSlideIndex = 0;

const updateInd = () => {
    let dots = document.querySelectorAll('.dot');
    dots.forEach((el, idx) => {
        el.classList.remove('active');
        if (idx === activeSlideIndex) {
            el.classList.add('active');
        }
    })
}

const moveSlide = dir => {
    let imgWidth = slides[activeSlideIndex].clientWidth;
    if (dir === "prev") {
        if (activeSlideIndex > 0) {
            activeSlideIndex--;
        } else {
            activeSlideIndex = slides.length - 1;
        }
    } else if (dir === "next") {
        if (activeSlideIndex < slides.length - 1) {
            activeSlideIndex++;
        } else {
            activeSlideIndex = 0;
        }
    }
    carouselTrack.style.transform = `translateX(-${activeSlideIndex * imgWidth}px)`;
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
            moveSlide("prev");
        }
    }
}

const generateInd = () => {
    for (let i = 0; i < slides.length; i++) {
        let newItem = document.createElement('li');
        newItem.classList.add('dot');
        newItem.setAttribute('data-index', i);
        dotsList.appendChild(newItem);
    }
    updateInd();
}

dotsList.addEventListener('click', e => {
    let target = e.target;
    if (target.classList.contains('dot')) {
        console.log(target.dataset.index);
        moveSlides(target.dataset.index);
    }
})

generateInd();






//проверка ввода текста для активации кнопки

function checkInput() {
    let tel = document.querySelector('.telnumber');
    let but = document.querySelector('.telsubmit');

    tel.addEventListener('input', function () {
        but.disabled = (tel.validity.valid != true);
    });
}

checkInput();

