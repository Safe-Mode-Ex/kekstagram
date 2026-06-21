import { render } from '../core/render';
import { createDataErrorElement, createPhotoCardElement } from '../core/template';
import { cleanError } from '../shared/utils';
import { getData } from '../shared/api';
import { initializeModal } from '../shared/modal';
import { populateDetailsCreator } from './details/details';
import { initializeFilter } from './filter/filter';

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
