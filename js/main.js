"use strict"



// Функция которая превращает HTML изображение в фоновое изображении CSS
function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();
/* ============================================================================= */

/* константа содержит класс ко-рый скрывает блок из видимости (displey: none) */
const classBlockHidden = 'block-hidden';

/* код для  2 блока. Варианты остекления балконов*/
const selectionGlazingTexts = document.querySelectorAll('.selection-glazing__text');
const selectionGlazingColumns = document.querySelectorAll('.selection-glazing__columns');

selectionGlazingTexts.forEach(elem => {
    elem.onclick = (event) => {
        let classElem = 'selection-glazing__text_active';
        removeClassActive(classElem);
        addClassActive(elem, classElem);

        addDispleyActive(selectionGlazingColumns);
        let iconId = event.target.id;
        removeDispleyNone2(iconId, selectionGlazingColumns, classBlockHidden)
    }
})


/* код для 3 блока. Расчет разных вариантов работ */
const menuCalcItems = document.querySelectorAll('.menu-calc__item');
const blockPriceRow = document.querySelectorAll('.block-price__row');

/* меняет слайды вовремя нажатия на ссылки */
menuCalcItems.forEach(elem => {
    elem.onclick = (event) => {
        if (elem.classList.contains('menu-calc__item_active') != true) {
            let classElem = 'menu-calc__item_active';
            removeClassActive(classElem);
            addClassActive(elem, classElem);

            addDispleyActive(blockPriceRow);
            removeDispleyNone(elem, blockPriceRow);
        }
    }
})


/* код для слайда внутренняя отделка */
const intDecIcons = document.querySelectorAll('.body-int-dec__img');
const intDecImgMain = document.querySelector('.int-dec__img');
const intDecImages = document.querySelectorAll('.body-int-dec__image');

/* присваивает класс активности на иконку (синий бордер) */
intDecImages.forEach(elem => {
    elem.onclick = () => {
        let classElem = 'body-int-dec__image_active';
        removeClassActive(classElem);
        addClassActive(elem, classElem);
    }
})

/* меняет картинки вовремя нажатия на иконки */
intDecIcons.forEach(elem => {
    elem.onclick = (event) => {
        let linkImage = event.target.id
        intDecImgMain.src = `img/section_3/${linkImage}.jpg`
    }
})

/* код для слайда внешняя отделка */
const extDecIcons = document.querySelectorAll('.body-ext-dec__image')
const extDecImgMain = document.querySelector('.ext-dec__img');


extDecIcons.forEach(elem => {
    elem.onclick = (event) => {
        /* присваивает класс активности на иконку (синий бордер) */
        let classElem = 'body-ext-dec__image_active';
        removeClassActive(classElem);
        addClassActive(elem, classElem);

        /* меняет картинки вовремя нажатия на иконки */
        let iconId = event.target.id
        extDecImgMain.src = `img/section_3/image${iconId}_s3.jpg`
    }
})
/* __________________________________________________________________________ */




/* функции */
/* удаляет класс активности с элемента */
function removeClassActive(classElem) {
    let itemActive = document.querySelector(`.${classElem}`);
    itemActive.classList.remove(`${classElem}`);
}

/* присваивает класс активности на элемент */
function addClassActive(elem, classElem) {
    elem.classList.add(`${classElem}`);
}

/* присваивает класс .block-hidden активности для переменной (коллекицй) переданной в параметр*/
function addDispleyActive(variable) {
    variable.forEach(elem => {
        elem.classList.add('block-hidden');
    })
}

/* удаляет класс block-hidden с активного слайда СТАРАЯ ФУНКЦИЯ*/
function removeDispleyNone(elem, variable) {
    variable.forEach(elem2 => {
        if (elem.classList.contains('int-dec') == true && elem2.classList.contains('int-dec') == true) {
            elem2.classList.remove('block-hidden')
        } else if (elem.classList.contains('ext-dec') == true && elem2.classList.contains('ext-dec') == true) {
            elem2.classList.remove('block-hidden')
        } else if (elem.classList.contains('ext-glaz') == true && elem2.classList.contains('ext-glaz') == true) {
            elem2.classList.remove('block-hidden')
        } else if (elem.classList.contains('roof-balc') == true && elem2.classList.contains('roof-balc') == true) {
            elem2.classList.remove('block-hidden')
        }
    })
}
/* удаляет класс block-hidden с активного слайда  НОВАЯ ФУНКЦИЯ */
function removeDispleyNone2(iconId, variable, classElem) {
    variable.forEach(elem => {
        if (elem.classList.contains(`${iconId}`) == true) {
            elem.classList.remove(`${classElem}`)
        }
    })
}

/* ============================================================================= */

/* ============================================================================= */

/* работа модальных окон */
/* собирает кнопки активации */
const backCalls = document.querySelectorAll('.back-call');
const costCalculations = document.querySelectorAll('.cost-calculation');
const workExamplesImages = document.querySelectorAll('.work-examples__image');

/* присваивет классы ПОПАП / header / slider */
const ppBackCall = document.querySelector('.pp-back-call');
const ppCostCalculation = document.querySelector('.pp-cost-calculation');
const ppCloseButtons = document.querySelectorAll('.close-button');
const header = document.querySelector('.header');

const workExamplesSlider = document.querySelector('.work-examples__slider');
const sliderImages = document.querySelectorAll('.slider-img');


/*  вызывает ПОПАП обратный звонок */
backCalls.forEach(elem => {
    elem.onclick = (event) => {
        event.preventDefault();
        ppBackCall.classList.add('active');
        scrollLock();
    }
})

/*  вызывает ПОПАП расчитать стоимость */
costCalculations.forEach(elem => {
    elem.onclick = (event) => {
        event.preventDefault();
        ppCostCalculation.classList.add('active');
        scrollLock();
    }
})

/*  вызывает ПОПАП слайдер */
let startImages; // переменнная для стартового изображения
let linkImageSlider = ''; // переменна для номера изображения по которому нажали

workExamplesImages.forEach(elem => {
    elem.onclick = (event) => {
        workExamplesSlider.classList.add('active');
        scrollLock();

        linkImageSlider = event.target.id;

        sliderImages.forEach(elem => {
            addClassActive(elem, 'block-hidden')
            if (elem.src.indexOf(linkImageSlider) != -1) {
                elem.classList.remove('block-hidden');
            }
        })
        // sliderImg.src = `img/section_4/${linkImageSlider}.jpg`
        startImages = searchStartImage(arrImages);
    }

})

/* закрывает слайдер */
document.querySelector('.slider__close').onclick = () => {
    workExamplesSlider.classList.remove('active');
    setTimeout(scrollActivation, 100); // задержка выполения, чтобы не видно было сдвига
}

/* отключает все ПОПАП */
ppCloseButtons.forEach(elem => {
    elem.onclick = () => {
        ppBackCall.classList.remove('active');
        ppCostCalculation.classList.remove('active');
        setTimeout(scrollActivation, 800); // задержка выполения, чтобы не видно было сдвига
    }
});

/* блокирует скролл на странице */
function scrollLock() {
    header.classList.add('active-header');
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "19px";
}
/* активирует скролл на странице */
function scrollActivation() {
    header.classList.remove('active-header');
    document.body.style.overflow = "visible";
    document.body.style.paddingRight = "0px";
}

/* ============================================================================= */
/* ============================================================================= */

/* код слайдера */
/* переменные кнопок */
const nextButton = document.querySelector('.next-button');
const backButton = document.querySelector('.back-button');
let sliderImage = document.querySelector('.slider__image');
/* массив с артикулами фото в папке = id */
let arrImages = ['image1_s4', 'image2_s4', 'image3_s4', 'image4_s4', 'image5_s4', 'image6_s4', 'image7_s4', 'image8_s4'];

nextButton.onclick = () => {

}


const images = document.querySelectorAll('.img-12-min');
let count = 0; // переменная, которая указывает на номер активного изображения в images

const next = document.querySelector('.next');
next.onclick = nextFunction;

const prev = document.querySelector('.prev');
prev.onclick = prevFunction;

const reset = document.querySelector('.reset');
reset.onclick = resetFunction;

const maxImg = document.querySelector('.img-12-max');


function nextFunction() {
    for (let i = 0; i < arrImages.length; i++) {
        if (images[i].classList.contains('block-hidden') != true) {
            images[i].classList.add('block-hidden');
            if (i == images.length - 1) {
                i = 0;
                images[i].classList.add('active-img');
                count = i;
                count++;
                maxImg.setAttribute('src', `img/${count}.png`)
            } else {
                i++;
                images[i].classList.add('active-img');
                count = i;
                count++;
                maxImg.setAttribute('src', `img/${count}.png`)

            }
        }

    }
}
// console.log(count)
function prevFunction() {
    for (let i = 0; i < images.length; i++) {
        if (images[i].classList.contains('active-img') === true) {
            images[i].classList.remove('active-img');
            if (i == 0) {
                i = images.length - 1;
                images[i].classList.add('active-img');
                count = i;
                count++;
                maxImg.setAttribute('src', `img/${count}.png`)
            } else {
                i--;
                images[i].classList.add('active-img');
                count = i;
                count++;
                maxImg.setAttribute('src', `img/${count}.png`)
            }
        }
    }
}

function resetFunction() {
    images.forEach(element => {
        element.classList.remove('active-img');
        images[0].classList.add('active-img');
        maxImg.setAttribute('src', `img/${1}.png`)
    })
}

















function searchStartImage(arrImages) {
    for (let i = 0; i < arrImages.length; i++) {
        if (linkImageSlider.indexOf(arrImages[i]) != -1) {
            return i;
        }
    }
}


/* ============================================================================= */