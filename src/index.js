import './pages/index.css';
import {createCard, handlerAddLike, handlerDelete} from './components/card.js';
import {initialCards} from './scripts/cards.js';
import {openPopup, setListenersClosePopup} from './components/modal';

const currentCard = document.querySelector('.places__list');
const newPlaceForm = document.forms['new-place'];
const namePlace = newPlaceForm.elements['place-name'];
const placeUrl = newPlaceForm.elements.link;
const popupAdd = document.querySelector('.popup_type_new-card');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const addMore = document.querySelector('.popup_type_new-card');
const profileEdit = document.querySelector('.popup_type_edit');
const currentImage = document.querySelector('.popup__image');
const imagePopup = document.querySelector('.popup_type_image');
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const profile = document.querySelector('.profile__info');
const popupEdit = document.querySelector('.popup_type_edit');
const popups = document.querySelectorAll('.popup');

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
    const newCard = {};

    evt.preventDefault();
    newCard.name = namePlace.value;
    newCard.link = placeUrl.value;
    newPlaceForm.reset();
    popupAdd.classList.remove('popup_is-opened');
    const cardNode = createCard(newCard, handlerDelete, handlerAddLike, handlerOpenImage);
    currentCard.prepend(cardNode);
};

//Просмотр изображения
function handlerOpenImage (evt) {
    if (evt.target.classList.contains('card__image')) {
        currentImage.src = evt.target.src;
        currentImage.alt = evt.target.alt;
        openPopup(imagePopup);
    };
};

//Настройка профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    profile.querySelector('.profile__title').textContent = nameInput.value;
    profile.querySelector('.profile__description').textContent = jobInput.value;
    popupEdit.classList.remove('popup_is-opened');
}

editProfileForm.addEventListener('submit', handleFormSubmit);

//Отправка формы
newPlaceForm.addEventListener('submit', addCard);

//Кнопка добавления карточки
buttonAdd.addEventListener('click', () => {
    openPopup(addMore);
});

//Кнопка настройки профиля
buttonProfileEdit.addEventListener('click', () => {
    openPopup(profileEdit);
    nameInput.value =  profile.querySelector('.profile__title').textContent;
    jobInput.value = profile.querySelector('.profile__description').textContent;
});

popups.forEach(el => setListenersClosePopup(el));