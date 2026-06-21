import { createDataErrorElement, createPhotoCardElement } from './template.js';
import { render } from './render.js';
import { initializeModal } from './modal.js';
import { populateDetailsCreator } from './details/details.js';
import { populateUploadImageCreator } from './upload/upload.js';
import { getData } from './api.js';
import { cleanError } from './utils.js';
import { initializeFilter } from './filter/filter.js';

const photoCardsContainerEl = document.querySelector('.pictures');
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

const imgUploadFormEl = photoCardsContainerEl.querySelector('.img-upload__form');
const imgUploadInputEl = imgUploadFormEl.querySelector('.img-upload__input');
const imgUploadOverlayEl = imgUploadFormEl.querySelector('.img-upload__overlay');
const predicateUploadTarget = (target) => Boolean(target.files[0]);
const populateUplodeImage = populateUploadImageCreator(
  imgUploadInputEl,
  imgUploadOverlayEl,
  imgUploadFormEl,
);

initializeModal({
  eventName: 'change',
  triggerEl: imgUploadInputEl,
  modalEl: imgUploadOverlayEl,
  predicate: predicateUploadTarget,
  modalOpenCb: populateUplodeImage,
});
