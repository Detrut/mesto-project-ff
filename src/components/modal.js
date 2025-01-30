const profileEdit = document.querySelector('.popup_type_edit');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const addMore = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');
const imagePopup = document.querySelector('.popup_type_image');
const currentImage = document.querySelector('.popup__image');

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

//Добавить еще
buttonAdd.addEventListener('click', () => {
    openPopup(addMore);
    document.addEventListener('keydown', keyHandler);
    setListenersClosePopup();
});

//Настройка профиля
buttonProfileEdit.addEventListener('click', () => {
    openPopup(profileEdit);
    document.addEventListener('keydown', keyHandler);
    setListenersClosePopup();
});

//Просмотр изображения
function handlerOpenImage (evt) {
    if (evt.target.classList.contains('card__image')) {
        currentImage.src = evt.target.src;
        currentImage.alt = evt.target.alt;
        openPopup(imagePopup);
        document.addEventListener('keydown', keyHandler);
        setListenersClosePopup();
    };
};

export {handlerOpenImage};