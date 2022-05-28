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

//проверка ввода текста для активации кнопки

function checkInput() {
    let tel = document.querySelector('.telnumber');
    let but = document.querySelector('.telsubmit');

    tel.addEventListener('input', function () {
        but.disabled = (tel.validity.valid != true);
    });
}

checkInput();

// предзагрузка страницы

window.onload = function () {
    document.body.classList.add('loaded_hiding');

    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}