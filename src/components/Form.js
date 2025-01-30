const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const profile = document.querySelector('.profile__info');
const popupEdit = document.querySelector('.popup_type_edit');

//Настройка профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    profile.querySelector('.profile__title').textContent = nameInput.value;
    profile.querySelector('.profile__description').textContent = jobInput.value;
    popupEdit.classList.remove('popup_is-opened');
}

nameInput.value =  profile.querySelector('.profile__title').textContent;
jobInput.value = profile.querySelector('.profile__description').textContent;

formElement.addEventListener('submit', handleFormSubmit); 

