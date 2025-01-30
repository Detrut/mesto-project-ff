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
};

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

export {createCard, handlerAddLike, handlerDelete};