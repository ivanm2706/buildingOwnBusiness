'use strict';

import dataOfObjectsImagesProgect from './utils/dataInfoImages.js';

const buttonsProjectsLink = document.querySelectorAll('.js-projects__link');
const projectsList = document.querySelector('#projects-list');
const buttonsQuickView = document.querySelectorAll('[data-id="buttonQuickView"]');
const modal = document.querySelector('#modal');
const buttonCloseModal = document.querySelector('#closeModal');
const buttonsChangePicture = document.querySelectorAll('[data-action="change-picture"]');

let filterBy = 'all';

filterProjects();
buttonCloseModal.addEventListener('click', closeModal);

forEachCustom(buttonsQuickView, openModalWindow);

forEachCustom(buttonsProjectsLink, (e) => {
  if (e.target.dataset.filter === filterBy) {
    return;
  }

  filterBy = e.target.dataset.filter;

  filterProjects();
});

forEachCustom(buttonsChangePicture, openModalWindow);


function forEachCustom(elems, foo) {
  for (let i = 0; i < elems.length; i++) {
    elems[i].addEventListener('click', foo);
  }
}

function filterProjects() {
  addActiveLinkToProject(filterBy);

  if (filterBy === 'all') {
    for (let i = 0; i < projectsList.children.length; i++) {
      projectsList.children[i].hidden = false;
    };
    return;
  }
  
  for (let i = 0; i < projectsList.children.length; i++) {

    if (projectsList.children[i].dataset.type === filterBy) {
      projectsList.children[i].hidden = false;
    } else {
      projectsList.children[i].hidden = true;
    }
  };
};

function addActiveLinkToProject(filter) {
  for (let i = 0; i < buttonsProjectsLink.length; i++) {
    if (buttonsProjectsLink[i].dataset.filter === filter) {
      buttonsProjectsLink[i].classList.add('projects__link--active');

      continue;
    }

    buttonsProjectsLink[i].classList.remove('projects__link--active');
  }
}

let typeOfElementForModalImage = '';
let idElementForModalImage = '';
let indexOfActiveElementForModalImage = 0;


function openModalWindow(e) {
  openModal();

  const parent = e.target.closest('[data-type]')

  if (e.target.dataset.id === 'buttonQuickView') {
    idElementForModalImage = parent.dataset.id;
    typeOfElementForModalImage = parent.dataset.type;
    indexOfActiveElementForModalImage = +e.target.dataset.index;
  }

  const { arrayOfImages } = dataOfObjectsImagesProgect[typeOfElementForModalImage][idElementForModalImage];


  if (e.target.dataset.id === 'button-prev-picture') {
    indexOfActiveElementForModalImage = indexOfActiveElementForModalImage - 1 < 0 ? arrayOfImages.length - 1 : indexOfActiveElementForModalImage - 1;

  }

  if (e.target.dataset.id === 'button-next-picture') {
    indexOfActiveElementForModalImage = indexOfActiveElementForModalImage + 1 > arrayOfImages.length - 1 ? 0 : indexOfActiveElementForModalImage + 1;
  }
  
  const img = createImage(arrayOfImages, indexOfActiveElementForModalImage, typeOfElementForModalImage);
  

  const containerImg = modal.querySelector('#containerImgModal');

  img.onload = () => {
    containerImg.innerHTML = '';
    containerImg.append(img);
    deactivateSpinWhenLoad();
  }
};

function createImage(arr, i, type) {
  const img = document.createElement('img');
  img.src = `${arr[i].src}`;
  img.classList.add('modal__img');

  if (arr[i].srcset !== '') {
    img.srcset = `${arr[i].srcset}`;
    img.sizes = `${arr[i].sizes}`;
  }
  
  img.alt = `${arr[i].alt}`;
  img.title = `${arr[i].title}`;
  img.dataset.id = `${i}`;
  img.dataset.type = `${type}`;

  return img;
}

function activateSpinWhenLoad() {
  const spinEll = modal.querySelector('#modal-spin');

  spinEll.classList.add('modal__spin--active');
}

function deactivateSpinWhenLoad() {
  const spinEll = modal.querySelector('#modal-spin');

  spinEll.classList.remove('modal__spin--active');
}

function toogleScroll(condition = true) {
  const body = document.body;
  if (condition) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = 'scroll';
  }
}

function openModal() {
  modal.classList.add('modal--open');
  toogleScroll();
  activateSpinWhenLoad();
}

function closeModal() {
  modal.classList.remove('modal--open');
  toogleScroll(false);
  deactivateSpinWhenLoad();
  typeOfElementForModalImage = '';
  idElementForModalImage = '';
  indexOfActiveElementForModalImage = 0;
}