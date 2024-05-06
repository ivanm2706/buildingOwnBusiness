'use strict';

// down list questions
const downListQuestion = document.querySelector('#down-list-question');

for (let i = 0; i < downListQuestion.children.length; i++) {
  downListQuestion.children[i].addEventListener('click', toggleDownListQuestion);
}

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