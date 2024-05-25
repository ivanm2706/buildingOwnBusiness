'use strict';

// form
const form = document.querySelector('#form');
const nameFormField = document.querySelector('#name');
const telFormField = document.querySelector('#tel');

nameFormField.addEventListener('change', () => {
  toggleErrorMassageToFillFieldForm('Name');
});
telFormField.addEventListener('change', () => {
  toggleErrorMassageToFillFieldForm('Tel');
});
form.addEventListener('submit', submitForm);


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
const botToken = '';

// Замените 'YOUR_CHAT_ID' на ID чата, в который вы хотите отправить сообщение
// @userinfobot - ищем через @userinfobot
const chatId = '';

// URL для отправки сообщения
const apiUrl = 'https://api.telegram.org/bot6638623940:AAFB2ScV-fOG0XFx_T3PHDnaPadPwb7ANY8/sendMessage';

// Опции для POST-запроса
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    chat_id: 1007310681,
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