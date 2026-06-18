import { setupScale } from './scale';
import { setupEffects } from './effects';

const populateUploadImageCreator = (imgUploadInputEl, imgUploadOverlayEl, imgUploadFormEl) => {
  const imgUploadPreviewImageEl = imgUploadOverlayEl.querySelector('.img-upload__preview img');

  const {initializeScale, destroyScale} = setupScale(imgUploadOverlayEl, imgUploadPreviewImageEl);
  const {initializeEffects, destroyEffects} = setupEffects(imgUploadOverlayEl, imgUploadPreviewImageEl);

  const creator = () => {
    imgUploadPreviewImageEl.src = URL.createObjectURL(imgUploadInputEl.files[0]);
    initializeScale();
    initializeEffects();
  };

  creator.clean = () => {
    imgUploadFormEl.reset();

    imgUploadPreviewImageEl.src = '';
    imgUploadPreviewImageEl.style = '';

    destroyScale();
    destroyEffects();
  };

  return creator;
};

export {populateUploadImageCreator};
