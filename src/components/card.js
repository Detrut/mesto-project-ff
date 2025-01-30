import {handlerAddLike, handlerDelete} from '../index';
import {handlerOpenImage} from './modal';

const cardsTemplate = document.querySelector('#card-template').content;
const currentCard = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (cardInfo, handlerDelete, handlerAddLike, handlerOpenImage) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cards = document.querySelector('.places__list');

    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;

    cardDeleteButton.addEventListener('click', handlerDelete);
    cards.addEventListener('click', handlerAddLike);
    currentCard.addEventListener('click', handlerOpenImage);

    return cardElement;
}

// @todo: Вывести карточки на страницу
function loadCards (cards) {
    cards.forEach(element => {
        const cardNode = createCard(element, handlerDelete, handlerAddLike, handlerOpenImage);
        currentCard.append(cardNode);
    });
}

export {loadCards, createCard};