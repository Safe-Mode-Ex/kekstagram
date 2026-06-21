import { setupScale } from './scale.js';
import { setupEffects } from './effects.js';
import { setupValidation } from './validate.js';
import { setupSubmit } from './submit.js';

const populateUploadImageCreator = (imgUploadInputEl, imgUploadOverlayEl, imgUploadFormEl) => {
  const imgUploadPreviewImageEl = imgUploadOverlayEl.querySelector('.img-upload__preview img');

  const {initializeScale, destroyScale} = setupScale(imgUploadOverlayEl, imgUploadPreviewImageEl);
  const {initializeEffects, destroyEffects} = setupEffects(imgUploadOverlayEl, imgUploadPreviewImageEl);
  const {initializeValidation, hasErrors, destroyValidation} = setupValidation(imgUploadFormEl);
  const {initializeSubmit, destroySubmit} = setupSubmit(imgUploadFormEl, hasErrors);

  const creator = (_, closeModal) => {
    imgUploadPreviewImageEl.src = URL.createObjectURL(imgUploadInputEl.files[0]);

    initializeScale();
    initializeEffects();
    initializeValidation();
    initializeSubmit(closeModal);
  };

  creator.clean = () => {
    imgUploadFormEl.reset();
    imgUploadPreviewImageEl.src = '';
    imgUploadPreviewImageEl.style = '';

    destroyScale();
    destroyEffects();
    destroyValidation();
    destroySubmit();
  };

  return creator;
};

export {populateUploadImageCreator};
