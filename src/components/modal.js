//Закрытие через Esc
function keyHandler(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    };
};

//Закрытие через клик
function setListenersClosePopup (popup) {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            closePopup(popup);
        };
    });
};

function openPopup (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', keyHandler);
};

function closePopup (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keyHandler);
};

export {openPopup, closePopup, setListenersClosePopup};