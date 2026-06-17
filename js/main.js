import {createPhotoCards} from './data';
import {createPhotoCardElement} from './template';
import {render} from './render';
import { initializeModal } from './modal';
import { populateBigPictureImgCreator } from './gallery';

const photoCardsContainerEl = document.querySelector('.pictures');
const bigPictureEl = document.querySelector('.big-picture');

const photoCards = createPhotoCards();
const populateBigPictureImg = populateBigPictureImgCreator(photoCards, bigPictureEl);
const predicatePictureTarget = (target) => target.closest('.picture');

render(photoCardsContainerEl, photoCards, createPhotoCardElement);
initializeModal({
  eventName: 'click',
  triggerEl: photoCardsContainerEl,
  modalEl: bigPictureEl,
  predicate: predicatePictureTarget,
  modalOpenCb: populateBigPictureImg
});

const imgUploadFormEl = photoCardsContainerEl.querySelector('.img-upload__form');
const imgUploadInputEl = imgUploadFormEl.querySelector('.img-upload__input');
const imgUploadOverlayEl = imgUploadFormEl.querySelector('.img-upload__overlay');

const predicateUploadTarget = (target) => Boolean(target.files[0]);

initializeModal({
  eventName: 'change',
  triggerEl: imgUploadInputEl,
  modalEl: imgUploadOverlayEl,
  predicate: predicateUploadTarget,
});
