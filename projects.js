'use strict';

const buttonsProjectsLink = document.querySelectorAll('.js-projects__link');
const projectsList = document.querySelector('#projects-list');
let filterBy = 'all';

filterProjects();

for (let i = 0; i < buttonsProjectsLink.length; i++) {
  buttonsProjectsLink[i].addEventListener('click', (e) => {
    if (e.target.dataset.filter === filterBy) {
      return;
    }

    filterBy = e.target.dataset.filter;

    filterProjects();
  });
};

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