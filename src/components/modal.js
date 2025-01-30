const popups = document.querySelectorAll('.popup');

//Закрытие через Esc
function keyHandler(evt) {
    if (evt.key === 'Escape') {
        popups.forEach(popup => {
            closePopup(popup);
        });
        document.removeEventListener('keydown', keyHandler);
    };
};

//Закрытие через клик
function setListenersClosePopup () {
    popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
                closePopup(popup);
            };
        });
    });
};

function openPopup (popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
};

function closePopup (popup) {
    popup.classList.remove('popup_is-opened');
};

export {openPopup, closePopup, keyHandler, setListenersClosePopup};