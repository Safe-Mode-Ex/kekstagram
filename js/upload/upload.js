import { initializeModal } from '../shared/modal.js';
import { uploadImageCreator } from './creator/creator.js';

const createUpload = (photoCardsContainerEl) => {
  const imgUploadFormEl = photoCardsContainerEl.querySelector('.img-upload__form');
  const imgUploadInputEl = imgUploadFormEl.querySelector('.img-upload__input');
  const imgUploadOverlayEl = imgUploadFormEl.querySelector('.img-upload__overlay');
  const predicateUploadTarget = (target) => Boolean(target.files[0]);
  const populateUploadImage = uploadImageCreator(
    imgUploadInputEl,
    imgUploadOverlayEl,
    imgUploadFormEl,
  );

  initializeModal({
    eventName: 'change',
    triggerEl: imgUploadInputEl,
    modalEl: imgUploadOverlayEl,
    predicate: predicateUploadTarget,
    modalOpenCb: populateUploadImage,
  });
};

export {createUpload};
