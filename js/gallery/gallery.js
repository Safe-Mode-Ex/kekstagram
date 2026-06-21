import { render } from '../core/render.js';
import { createDataErrorElement, createPhotoCardElement } from '../core/template.js';
import { cleanError } from '../shared/utils.js';
import { getData } from '../shared/api.js';
import { initializeModal } from '../shared/modal.js';
import { populateDetailsCreator } from './details/details.js';
import { initializeFilter } from './filter/filter.js';

const createGallery = (photoCardsContainerEl) => {
  const bigPictureEl = document.querySelector('.big-picture');

  getData().then((photoCards) => {
    const populateDetails = populateDetailsCreator(photoCards, bigPictureEl);
    const predicatePictureTarget = (target) => target.closest('.picture');

    initializeFilter(photoCardsContainerEl, photoCards);
    render(photoCardsContainerEl, createPhotoCardElement, photoCards);

    initializeModal({
      eventName: 'click',
      triggerEl: photoCardsContainerEl,
      modalEl: bigPictureEl,
      predicate: predicatePictureTarget,
      modalOpenCb: populateDetails
    });
  }).catch(() => {
    render(document.body, createDataErrorElement);
    cleanError();
  });
};

export {createGallery};
