import {addLike, deleteLike, deleteCard} from '../components/api';

const cardsTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard (cardInfo, handlerDelete, handlerAddLike, handlerOpenImage, userId) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const currentImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = cardInfo.name;
    cardElement.querySelector('.card__image').id = cardInfo._id;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    if (!(cardInfo.likes == null)) {
        cardElement.querySelector('.card__like-counter').textContent = cardInfo.likes.length;
        
        if (cardInfo.likes.find(element => element._id == userId)) {
            cardElement.querySelector('.card__like-counter').classList.add('card__like-button_is-active');
        }
    }
    if (!(cardInfo.owner._id == userId)) {
        cardDeleteButton.style.display = 'none';
    }

    cardDeleteButton.addEventListener('click', handlerDelete);
    cardLikeButton.addEventListener('click', handlerAddLike);
    currentImage.addEventListener('click', handlerOpenImage);

    return cardElement;
};

//Поставить лайк
function handlerAddLike (evt) {
    const cardElement = evt.target.closest('.card');
    const cardId = cardElement.querySelector('.card__image').id;
    const cardLike = cardElement.querySelector('.card__like-button_is-active');
    if (!cardLike){
        addLike(cardId)
        .then(data => {
            cardElement.querySelector('.card__like-counter').textContent = data.likes.length;
            evt.target.classList.add('card__like-button_is-active');
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        deleteLike(cardId)
        .then(data => {
            cardElement.querySelector('.card__like-counter').textContent = data.likes.length;
            evt.target.classList.remove('card__like-button_is-active');
        })
        .catch((err) => {
            console.log(err);
        })
    }
};

//Удаление карточки
function handlerDelete (evt) {
    const cardElement = evt.target.closest('.card');
    const cardId = cardElement.querySelector('.card__image').id;
    deleteCard(cardId)
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => {
        console.log(err);
    })
};

export {createCard, handlerAddLike, handlerDelete};