import './pages/index.css';
import {loadCards, createCard} from './components/card.js';
import {initialCards} from './scripts/cards.js';
import './components/modal.js';
import './components/Form.js';

loadCards(initialCards);

//Добавление карточки
const formElement = document.forms['new-place'];
const namePlace = formElement.elements['place-name'];
const placeUrl = formElement.elements.link;
const popupAdd = document.querySelector('.popup_type_new-card');
const currentCard = document.querySelector('.places__list');
let newCards = {};

function addCard (evt) {
    evt.preventDefault();
    newCards.name = namePlace.value;
    newCards.link = placeUrl.value;
    initialCards.unshift(newCards);
    placeUrl.value = '';
    namePlace.value = '';
    popupAdd.classList.remove('popup_is-opened');
    const cardNode = createCard(initialCards[0]);
    currentCard.prepend(cardNode);
};

formElement.addEventListener('submit', addCard);

//Поставить лайк
function handlerAddLike (evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    };
};

//Удаление карточки
function handlerDelete (evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
};

export {handlerAddLike, handlerDelete};
