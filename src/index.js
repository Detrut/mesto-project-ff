import './pages/index.css';
import {createCard, handlerAddLike, handlerDelete} from './components/card.js';
import {openPopup, closePopup, setListenersClosePopup} from './components/modal';
import {enableValidation, clearValidation} from './components/validation.js';
import './components/api.js';
import {getInitialCards, getUserData, getUserId, postNewCard, changeUserInfo, changeUserAvatar} from './components/api.js';

const currentCard = document.querySelector('.places__list');
const newPlaceForm = document.forms['new-place'];
const namePlace = newPlaceForm.elements['place-name'];
const placeUrl = newPlaceForm.elements.link;
const popupAdd = document.querySelector('.popup_type_new-card');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileEdit = document.querySelector('.popup_type_edit');
const currentImage = document.querySelector('.popup__image');
const imagePopup = document.querySelector('.popup_type_image');
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const profile = document.querySelector('.profile__info');
const popupEdit = document.querySelector('.popup_type_edit');
const popups = document.querySelectorAll('.popup');
const profileAvatar = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup__avatar-edit');
const editAvatarForm = document.forms["avatar"];
const avatarUrl = editAvatarForm.elements.avatarUrl;

export const userId = await getUserId();

// @todo: Вывести карточки на страницу
Promise.all([getInitialCards(), getUserData()])
    .then(([cards]) => {
        cards.forEach(element => {
            const cardNode = createCard(element, handlerDelete, handlerAddLike, handlerOpenImage);
            currentCard.append(cardNode);
            if (!(element.owner._id === userId)) {
                cardNode.querySelector('.card__delete-button').style.display = 'none';
            }
        })
    })
    .catch((err) => {
        console.log(err);
    })

//Получение данных о пользователе
getUserData()
    .then(data => {
        document.querySelector('.profile__title').textContent = data.name;
        document.querySelector('.profile__description').textContent = data.about;
        document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
        console.log(err);
    })

//Добавление карточки
function addCard (evt) {
    const newCard = {};

    evt.preventDefault();
    renderLoading(true, popupAdd);
    newCard.name = namePlace.value;
    newCard.link = placeUrl.value;
    postNewCard(namePlace, placeUrl)
      .catch((err) => {
        renderError(`Ошибка ${err}`);
      })
      .finally(() => {
        renderLoading(false, popupAdd);
      })
    newPlaceForm.reset();
    closePopup(popupAdd);
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
    renderLoading(true, popupEdit);
    profile.querySelector('.profile__title').textContent = nameInput.value;
    profile.querySelector('.profile__description').textContent = jobInput.value;
    changeUserInfo(nameInput, jobInput)
      .catch((err) => {
        renderError(`Ошибка ${err}`);
      })
      .finally(() => {
        renderLoading(false, popupEdit);
      })
    closePopup(popupEdit);
}

//Настройка аватара
function handlerAvatarSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, avatarPopup);
    console.log(avatarUrl.value);
    changeUserAvatar(avatarUrl)
      .catch((err) => {
        renderError(`Ошибка ${err}`);
      })
      .finally(() => {
        renderLoading(false, avatarPopup);
      })
    closePopup(avatarPopup);
}

//Отображение загрузки формы
function renderLoading (isLoading, popup) {
    if (isLoading) {
        popup.querySelector('.popup__button').textContent = 'Сохранение...';
    } else {
        popup.querySelector('.popup__button').textContent = 'Сохранить'
    }
}

//Отправка формы об аватаре
editAvatarForm.addEventListener('submit', handlerAvatarSubmit);

//Отправка формы о пользователе
editProfileForm.addEventListener('submit', handleFormSubmit);

//Отправка формы о новом месте
newPlaceForm.addEventListener('submit', addCard);

//Кнопка добавления карточки
buttonAdd.addEventListener('click', () => {
    openPopup(popupAdd);
    clearValidation(newPlaceForm);
});

//Кнопка настройки профиля
buttonProfileEdit.addEventListener('click', () => {
    openPopup(profileEdit);
    clearValidation(editProfileForm);
    nameInput.value =  profile.querySelector('.profile__title').textContent;
    jobInput.value = profile.querySelector('.profile__description').textContent;
});

//Кнопка настройки аватара
profileAvatar.addEventListener('click', () => {
    openPopup(avatarPopup);
});

//Добавить слушателя закрытия все попапам
popups.forEach(el => setListenersClosePopup(el));

//Включить валидацию форм
enableValidation();
