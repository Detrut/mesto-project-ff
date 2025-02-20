import './pages/index.css';
import {
  createCard,
  handlerAddLike,
  handlerDelete
} from './components/card.js';
import {
  openPopup,
  closePopup,
  setListenersClosePopup
} from './components/modal';
import {
  enableValidation,
  clearValidation
} from './components/validation.js';
import {
  getInitialCards,
  getUserData,
  getUserId,
  postNewCard,
  changeUserInfo,
  changeUserAvatar
} from './components/api.js';

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
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonSelector: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

let userId = await getUserId();


Promise.all([getInitialCards(), getUserData()])
    .then((values) => {
        //Вывести карточки на страницу
        values[0].forEach(element => {
            const cardNode = createCard(element, handlerDelete, handlerAddLike, handlerOpenImage, userId);
            currentCard.append(cardNode);
        })
        //Получение данных о пользователе
        document.querySelector('.profile__title').textContent = values[1].name;
        document.querySelector('.profile__description').textContent = values[1].about;
        profileAvatar.style.backgroundImage = `url(${values[1].avatar})`;
    })
    .catch((err) => {
        console.log(err);
    })

//Добавление карточки
function addCard (evt) {
    const newCard = {};

    evt.preventDefault();
    renderLoading(true, popupAdd);
    postNewCard(namePlace, placeUrl)
     .then((response) => {
        const cardNode = createCard(response, handlerDelete, handlerAddLike, handlerOpenImage, userId);
        currentCard.prepend(cardNode);
        newCard.name = namePlace.value;
        newCard.link = placeUrl.value;
        newPlaceForm.reset();
        closePopup(popupAdd);
     })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, popupAdd);
      })
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
    changeUserInfo(nameInput, jobInput)
        .then(() => {
            profile.querySelector('.profile__title').textContent = nameInput.value;
            profile.querySelector('.profile__description').textContent = jobInput.value;
            closePopup(popupEdit);
        })
        .catch((err) => {
        console.log(err);
        })
        .finally(() => {
        renderLoading(false, popupEdit);
        })
}

//Настройка аватара
function handlerAvatarSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, avatarPopup);
    changeUserAvatar(avatarUrl)
        .then((response) => {
            profileAvatar.style.backgroundImage = `url(${response.avatar})`;
            closePopup(avatarPopup);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, avatarPopup);
        })
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
    clearValidation(newPlaceForm, validationConfig);
});

//Кнопка настройки профиля
buttonProfileEdit.addEventListener('click', () => {
    openPopup(profileEdit);
    clearValidation(editProfileForm, validationConfig);
    nameInput.value =  profile.querySelector('.profile__title').textContent;
    jobInput.value = profile.querySelector('.profile__description').textContent;
});

//Кнопка настройки аватара
profileAvatar.addEventListener('click', () => {
    clearValidation(avatarPopup, validationConfig);
    openPopup(avatarPopup);
});

//Добавить слушателя закрытия все попапам
popups.forEach(el => setListenersClosePopup(el));

//Включить валидацию форм
enableValidation(validationConfig);
