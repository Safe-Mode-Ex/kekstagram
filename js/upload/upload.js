import { setupScale } from './scale';
import { setupEffects } from './effects';
import { setupValidation } from './validate';

const populateUploadImageCreator = (imgUploadInputEl, imgUploadOverlayEl, imgUploadFormEl) => {
  const imgUploadPreviewImageEl = imgUploadOverlayEl.querySelector('.img-upload__preview img');

  const {initializeScale, destroyScale} = setupScale(imgUploadOverlayEl, imgUploadPreviewImageEl);
  const {initializeEffects, destroyEffects} = setupEffects(imgUploadOverlayEl, imgUploadPreviewImageEl);
  const {initializeValidation, hasErrors, destroyValidation} = setupValidation(imgUploadFormEl);

  const creator = () => {
    imgUploadPreviewImageEl.src = URL.createObjectURL(imgUploadInputEl.files[0]);
    initializeScale();
    initializeEffects();
    initializeValidation();

    imgUploadFormEl.addEventListener('submit', (evt) => {
      if (hasErrors()) {
        evt.preventDefault();
      }
    });
  };

  creator.clean = () => {
    imgUploadFormEl.reset();

    imgUploadPreviewImageEl.src = '';
    imgUploadPreviewImageEl.style = '';

    destroyScale();
    destroyEffects();
    destroyValidation();
  };

  return creator;
};

export {populateUploadImageCreator};
