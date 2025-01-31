const cardsTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard (cardInfo, handlerDelete, handlerAddLike, handlerOpenImage) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const currentImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;

    cardDeleteButton.addEventListener('click', handlerDelete);
    cardLikeButton.addEventListener('click', handlerAddLike);
    currentImage.addEventListener('click', handlerOpenImage);

    return cardElement;
};

//Поставить лайк
function handlerAddLike (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

//Удаление карточки
function handlerDelete (evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
};

export {createCard, handlerAddLike, handlerDelete};