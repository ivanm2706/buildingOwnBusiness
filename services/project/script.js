'use strict';
import dataOfObjectsImagesProgect from '../../utils/dataInfoImages.js';

const h1MainElement = document.querySelector('#h1');
const typeOfProjectEllement = document.querySelector('#typeOfProject');
const nameOfPageElement = document.querySelector('#nameOfPage');
const elSpanNameOfProject = document.querySelector('#name-of-progect-info');
const clientInfoEl = document.querySelector('#client-info');
const projectTypeInfoEl = document.querySelector('#project-type-info');
const locationInfoEl = document.querySelector('#location-info');
const blockImages = document.querySelector('#block-images');
const buttonCloseModal = document.querySelector('#closeModal');
const buttonsChangePicture = document.querySelectorAll('[data-action="change-picture"]');
const modal = document.querySelector('#modal');

forEachCustom(buttonsChangePicture, openModalWindow);


function forEachCustom(elems, foo) {
  for (let i = 0; i < elems.length; i++) {
    elems[i].addEventListener('click', foo);
  }
}

buttonCloseModal.addEventListener('click', closeModal);

const currentUrl = window.location.href;
const url = new URL(currentUrl);
const params = url.searchParams;

const nameOfPage = params.get('name').replaceAll('-', ' ').replace('tn', 'TN');
const typeOfProject = params.get('type');
const idOfProject = params.get('id');
const clientName = params.get('client').replaceAll('-', ' ');
const locationInfo = params.get('location').replaceAll('-', ' ').replace('tn', 'TN');
const { arrayOfImages } = dataOfObjectsImagesProgect[typeOfProject][idOfProject];

arrayOfImages.forEach((image, i) => createImage(image, i));

function createImage(obj, i) {
  const div = document.createElement('div');
  const img = document.createElement('img');

  img.src = `${obj.src}`;
  img.srcset = `${obj.srcset}`;
  img.title = `${obj.title}`;
  img.alt = `${obj.alt}`;
  img.sizes = `${obj.sizes}`;
  img.dataset.id = `buttonQuickView`;
  img.dataset.index = i;

  img.addEventListener('click', openModalWindow)

  div.append(img);
  blockImages.append(div);
}

elSpanNameOfProject.innerText = nameOfPage;
locationInfoEl.innerText = locationInfo;
projectTypeInfoEl.innerText = typeOfProject + ' remodeling';
clientInfoEl.innerText = clientName;
h1MainElement.innerText = nameOfPage;
nameOfPageElement.innerText = nameOfPage;
typeOfProjectEllement.innerText = typeOfProject;
typeOfProjectEllement.href = `services/${typeOfProject}#${typeOfProject}`;

let indexOfActiveElementForModalImage = 0;

function openModalWindow(e) {
  console.dir(e.target.dataset.id);
  openModal();

  if (e.target.dataset.id === 'buttonQuickView') {
    indexOfActiveElementForModalImage = e.target.dataset.index;
  }

  if (e.target.dataset.id === 'button-prev-picture') {
    indexOfActiveElementForModalImage = indexOfActiveElementForModalImage - 1 < 0 ? arrayOfImages.length - 1 : indexOfActiveElementForModalImage - 1;

  }

  if (e.target.dataset.id === 'button-next-picture') {
    indexOfActiveElementForModalImage = indexOfActiveElementForModalImage + 1 > arrayOfImages.length -1 ? 0 : indexOfActiveElementForModalImage + 1;
  }

  const img = createImageForModal(arrayOfImages, indexOfActiveElementForModalImage, typeOfProject);

  const containerImg = modal.querySelector('#containerImgModal');

  img.onload = () => {
    containerImg.innerHTML = '';
    containerImg.append(img);
    
    deactivateSpinWhenLoad();
  }
};

function createImageForModal(arr, i, type) {
  const img = document.createElement('img');
  img.src = `${arr[i].src}`;
  img.classList.add('modal__img');

  if (arr[i].srcset !== '') {
    img.srcset = `${arr[i].srcset}`;
    img.sizes = `${arr[i].sizes}`;
  }
  
  img.alt = `${arr[i].srcset}`;
  img.title = `${arr[i].srcset}`;
  img.dataset.id = `${i}`;
  img.dataset.type = `${type}`;

  return img;
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
  indexOfActiveElementForModalImage = 0;
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