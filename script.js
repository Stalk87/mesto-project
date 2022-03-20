//попапы
const popupEdit = document.querySelector('.popup_edit');
const popupAdd =  document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_type_image');

//содержимое форм и попапов
const popupForm = document.querySelector('.popup__form');
const popupInputs = popupAdd.querySelectorAll('.popup__form-text');
const nameInput = popupEdit.querySelector('#name');
const aboutInput = popupEdit.querySelector('#about');
const nameSubmit = popupAdd.querySelector('#place');
const linkSubmit = popupAdd.querySelector('#link');
const imagePopup = popupImage.querySelector('.popup__image');
const imageCapture = popupImage.querySelector('.popup__image-capture');

//кнопки
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const buttonClose = document.querySelectorAll('.popup__button-close');
const buttonSave = document.querySelector('.popup__button-save');

//поля профиля
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

//поля карточек
const cardTemplate = document.querySelector('.gallery__template').content;
const cardsContainer = document.querySelector('.gallery__figure');

//карточки
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//открытие попапа редактирования
buttonEdit.addEventListener('click', () => {
openPopup(popupEdit)
nameInput.value = profileName.textContent;
aboutInput.value = profileAbout.textContent;
});

//открытие попапа добавления
buttonAdd.addEventListener('click', () => {
openPopup(popupAdd)
});

//закрытие попапа крестиком
buttonClose.forEach(close =>
    close.addEventListener('click', evt => {
        evt.target.closest('.popup').classList.remove('popup_opened');
    })
);

//функция закрытия попапа на submit и enter
function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
}

//функция редактирования информации профиля
function editProfileInfo(evt) {
    evt.preventDefault(); //отменяем стандартное событие
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupEdit);
}

//созданение информации из попапа редактирования
popupForm.addEventListener('submit', editProfileInfo);

//функция очистки полей
function resetInput () {
    popupInputs.forEach(item => item.value = '');
}

//функционал попапа с фотографией
function openPopupImage(imageLink, header) {
    popupImage.setAttribute('src', imageLink);
    popupImage.setAttribute('alt', header);
    imageCapture.textContent = header;
    openPopup(popupImage);
}

//создание карточек
function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.gallery__photo');
    cardElement.querySelector('.gallery__caption').textContent = name;
    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', name);

    //открытие попапа с фотографией
    cardImage.addEventListener('click', () => {
        openPopupImage(link, name);
    })
    //функционал лайка
    cardElement.querySelector('.gallery__button-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('gallery__button-liked');
    })
    //удаление карточки
    cardElement.querySelector('.gallery__button-del').addEventListener('click', function (evt) {
        evt.target.closest('.gallery__figure').remove();
    })

    return cardElement;
}

//добавление карточек из initialcards
initialCards.forEach(item => cardsContainer.append(createCard(item.name, item.link)));

//добавление новой карточки через форму
popupAdd.addEventListener('submit', evt => {
    evt.preventDefault();
    cardsContainer.prepend(createCard(nameSubmit.value, linkSubmit.value));
    closePopup(popupAdd);
    resetInput();
})