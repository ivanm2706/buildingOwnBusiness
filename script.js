'use strict';

const mainNav = document.querySelector('#mainNav');
const socialLinks = document.querySelector('#socialLinks');
const listOfNavLinks = document.querySelectorAll('[data-link="link"]');
const mainNavHomeButton = document.querySelector('#mainNav__homeButton');
const mainNavWrapperLinksAndSocial = document.querySelector('#mainNav__wrapperLinksAndSocial');
const downListQuestion = document.querySelector('#down-list-question');
const form = document.querySelector('#form');
const nameFormField = document.querySelector('#name');
const telFormField = document.querySelector('#tel');

nameFormField.addEventListener('change', () => {
  toggleErrorMassageToFillFieldForm('Name');
});
telFormField.addEventListener('change', () => {
  toggleErrorMassageToFillFieldForm('Tel');
});
document.addEventListener('scroll', addStickInMainNavWhenScroll);
mainNavHomeButton.addEventListener('click', toggleMobileMainNavButton);
form.addEventListener('submit', submitForm);

for (let i = 0; i < downListQuestion.children.length; i++) {
  downListQuestion.children[i].addEventListener('click', toggleDownListQuestion);
}

addActiveLinkWhenLoadDoc();


function addStickInMainNavWhenScroll() {
  const scrollTop = document.documentElement.scrollTop;
  const widthOfDocument = document.body.clientWidth;
  let scrollTopAmount = 200;

  if (widthOfDocument < 968) {
    scrollTopAmount = 800;
  }

  if (scrollTop > scrollTopAmount) {
    mainNav.classList.add('mainNav--stick');
    socialLinks.classList.add('socialLinks--stick');
    mainNavHomeButton.classList.add('mainNav__homeButton--stick');
  } else {
    mainNav.classList.remove('mainNav--stick');
    socialLinks.classList.remove('socialLinks--stick');
    mainNavHomeButton.classList.remove('mainNav__homeButton--stick');
  }
};

function addActiveLinkWhenLoadDoc() {
  const hash = location.hash;

  listOfNavLinks.forEach(e => {
    if (e.hash === hash) {
      e.classList.add('mainNav__link--active');
    }
  });
};

function toggleMobileMainNavButton() {
  mainNavHomeButton.classList.toggle('mainNav__homeButton--active');
  mainNavWrapperLinksAndSocial.classList.toggle('mainNav__wrapperLinksAndSocial--active');
  

  const computedStylesMainNav = window.getComputedStyle(mainNav);
  
  if (parseFloat(computedStylesMainNav.height) <= 60) {
    mainNav.style.height = '370px';
  } else {
    mainNav.style.height = '60px';
  }

  
};

function toggleDownListQuestion(e) {
  e.stopPropagation();
  const elResponceLD = e.currentTarget.querySelector('.js-responceLD');
  const elWrapResponceLD = e.currentTarget.querySelector('.js-responceLDwrapper');

  const styleElResponceLD = window.getComputedStyle(elResponceLD);
  const heightElResponceLD = styleElResponceLD.height;
  
  if (elWrapResponceLD.style.height === '0px' || elWrapResponceLD.style.height === '') {
    elWrapResponceLD.style.height = heightElResponceLD;
  } else {
    elWrapResponceLD.style.height = 0;
  }
}

function submitForm(e) {
  e.preventDefault();
  
  const name = e.target.querySelector('#name');
  const tel = e.target.querySelector('#tel');
  const select = e.target.querySelector('#select');
  const email = e.target.querySelector('#email');
  const message = e.target.querySelector('#message');
  const buttonSubmit = e.target.querySelector('[type="submit"]');
  const errorBlock = document.querySelector('#error');
  const successBlock = document.querySelector('#success');

  let isValid = true;

  if (name.value.replaceAll(' ', '') === '') {
    isValid = false;
    toggleErrorMassageToFillFieldForm('Name', true);
  }

  if (tel.value === '') {
    isValid = false;
    toggleErrorMassageToFillFieldForm('Tel', true);
  }

  if (!isValid) {
    console.error('Please enter required field...');
    return;
  }

  const data = {
    name: name.value,
    tel: tel.value,
    select: select.value,
    email: email.value,
    message: message.value,
  };

  const messageText = `
    Order:
    Name: ${data.name};
    Tel: ${data.tel};
    Select: ${data.select};
    Email: ${data.email};
    Message: ${data.message};
  `;

  
// Замените 'YOUR_BOT_TOKEN' на токен вашего бота
// создать бота через @BotFather => /newbot
const botToken = '6638623940:AAFB2ScV-fOG0XFx_T3PHDnaPadPwb7ANY8';

// Замените 'YOUR_CHAT_ID' на ID чата, в который вы хотите отправить сообщение
// @userinfobot - ищем через @userinfobot
const chatId = '1007310681';

// URL для отправки сообщения
const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

// Опции для POST-запроса
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    chat_id: chatId,
    text: messageText,
  }),
};

// Отправка запроса

buttonSubmit.classList.add('button--spin');

fetch(apiUrl, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    successBlock.classList.add('success--active');

    setTimeout(() => successBlock.classList.remove('success--active'), 3000);

    name.value = '';
    tel.value = '';
    select.value = '';
    email.value = '';
    message.value = '';
  })
  .catch((error) => {
    console.error('Ошибка:', error);
    errorBlock.classList.add('error--active');

    setTimeout(() => errorBlock.classList.remove('error--active'), 3000);
  })
  .finally(() => {
    buttonSubmit.classList.remove('button--spin');
    
  });
};

function toggleErrorMassageToFillFieldForm(value, fromForm = false) {
  const textErrorMessage = form.querySelector('.js-form__requiredField--' + value);
  const wrapperErrorMessage = form.querySelector('.js-form__requiredFieldWrapper--' + value);

  const textErrorMessageStyle = window.getComputedStyle(textErrorMessage);

  if (fromForm) {
     wrapperErrorMessage.style.height = textErrorMessageStyle.height;
  } else {
    wrapperErrorMessage.style.height = '0';
  }
};
     