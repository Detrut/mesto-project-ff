import './pages/index.css';
import {createCard, handlerAddLike, handlerDelete} from './components/card.js';
import {initialCards} from './scripts/cards.js';
import {openPopup, closePopup, keyHandler, setListenersClosePopup} from './components/modal'
import './components/Form.js';

const currentCard = document.querySelector('.places__list');
const formElement = document.forms['new-place'];
const namePlace = formElement.elements['place-name'];
const placeUrl = formElement.elements.link;
const popupAdd = document.querySelector('.popup_type_new-card');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const addMore = document.querySelector('.popup_type_new-card');
const profileEdit = document.querySelector('.popup_type_edit');
const currentImage = document.querySelector('.popup__image');
const imagePopup = document.querySelector('.popup_type_image');
let newCards = {};

// @todo: Вывести карточки на страницу
function loadCards (cards) {
    cards.forEach(element => {
        const cardNode = createCard(element, handlerDelete, handlerAddLike, handlerOpenImage);
        currentCard.append(cardNode);
    });
};

loadCards(initialCards);

//Добавление карточки
function addCard (evt) {
    evt.preventDefault();
    newCards.name = namePlace.value;
    newCards.link = placeUrl.value;
    initialCards.unshift(newCards);
    placeUrl.value = '';
    namePlace.value = '';
    popupAdd.classList.remove('popup_is-opened');
    const cardNode = createCard(initialCards[0], handlerDelete);
    currentCard.prepend(cardNode);
};

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

//Отправка формы
formElement.addEventListener('submit', addCard);

//Кнопка добавления карточки
buttonAdd.addEventListener('click', () => {
    openPopup(addMore);
    document.addEventListener('keydown', keyHandler);
    setListenersClosePopup();
});

//Кнопка настройки профиля
buttonProfileEdit.addEventListener('click', () => {
    openPopup(profileEdit);
    document.addEventListener('keydown', keyHandler);
    setListenersClosePopup();
});