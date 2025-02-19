import {config} from '../components/api';
import {userId} from '../index.js';

const cardsTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard (cardInfo, handlerDelete, handlerAddLike, handlerOpenImage) {
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

    cardDeleteButton.addEventListener('click', handlerDelete);
    cardLikeButton.addEventListener('click', handlerAddLike);
    currentImage.addEventListener('click', handlerOpenImage);

    return cardElement;
};

//Поставить лайк
function handlerAddLike (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
    const cardElement = evt.target.closest('.card');
    const cardId = cardElement.querySelector('.card__image').id;
    const cardLike = cardElement.querySelector('.card__like-button_is-active');
    if (cardLike){
        return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          })
        .then(data => {
            cardElement.querySelector('.card__like-counter').textContent = data.likes.length;
        })
    } else {
        return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          })
        .then(data => {
            cardElement.querySelector('.card__like-counter').textContent = data.likes.length;
        })
    }
};

//Удаление карточки
function handlerDelete (evt) {
    const cardElement = evt.target.closest('.card');
    const cardId = cardElement.querySelector('.card__image').id;
    cardElement.remove();
    fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
};

export {createCard, handlerAddLike, handlerDelete};