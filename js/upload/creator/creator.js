import { setupScale } from './initializers/scale.js';
import { setupEffects } from './initializers/effects.js';
import { setupValidation } from './initializers/validate.js';
import { setupSubmit } from './initializers/submit.js';
import { setupFile } from './initializers/file.js';

const uploadImageCreator = (imgUploadInputEl, imgUploadOverlayEl, imgUploadFormEl) => {
  const imgUploadPreviewImageEl = imgUploadOverlayEl.querySelector('.img-upload__preview img');

  const {initializeFile, destroyFile} = setupFile(imgUploadInputEl, imgUploadPreviewImageEl, imgUploadOverlayEl);
  const {initializeScale, destroyScale} = setupScale(imgUploadOverlayEl, imgUploadPreviewImageEl);
  const {initializeEffects, destroyEffects} = setupEffects(imgUploadOverlayEl, imgUploadPreviewImageEl);
  const {initializeValidation, hasErrors, destroyValidation} = setupValidation(imgUploadFormEl);
  const {initializeSubmit, destroySubmit} = setupSubmit(imgUploadFormEl, hasErrors);

  const creator = (_, closeModal) => {
    initializeFile();
    initializeScale();
    initializeEffects();
    initializeValidation();
    initializeSubmit(closeModal);
  };

  creator.clean = () => {
    imgUploadFormEl.reset();
    imgUploadPreviewImageEl.style = '';

    destroyFile();
    destroyScale();
    destroyEffects();
    destroyValidation();
    destroySubmit();
  };

  return creator;
};

export {uploadImageCreator};
