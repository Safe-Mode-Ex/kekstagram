import { createDataErrorElement, createPhotoCardElement } from './template';
import { render } from './render';
import { initializeModal } from './modal';
import { populateDetailsCreator } from './details/details';
import { populateUploadImageCreator } from './upload/upload';
import { getData } from './api';
import { cleanError } from './utils';
import { initializeFilter } from './filter/filter';

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
