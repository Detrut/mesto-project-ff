// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardPlace = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (cardInfo) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardDeliteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;

    cardDeliteButton.addEventListener('click', removeCard);

    return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(el) {
    const cardElement = el.target.closest('.card');
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
function loadCards (cards) {
    cards.forEach(element => {
        const cardNode = createCard(element);
        cardPlace.append(cardNode);
    });
}

loadCards(initialCards);