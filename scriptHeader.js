'use strict';

const mainNav = document.querySelector('#mainNav');
const socialLinks = document.querySelector('#socialLinks');
const listOfNavLinks = document.querySelectorAll('[data-link="link"]');
const mainNavHomeButton = document.querySelector('#mainNav__homeButton');
const mainNavWrapperLinksAndSocial = document.querySelector('#mainNav__wrapperLinksAndSocial');


addActiveLinkWhenLoadDoc();
document.addEventListener('scroll', addStickInMainNavWhenScroll);
mainNavHomeButton.addEventListener('click', toggleMobileMainNavButton);

function addActiveLinkWhenLoadDoc() {
  const hash = location.hash;

  console.log(listOfNavLinks)

  listOfNavLinks.forEach(e => {
    console.log(hash)
    console.log(e.hash)
    if (e.hash === hash) {
      e.classList.add('mainNav__link--active');
    }
  });
};

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


     