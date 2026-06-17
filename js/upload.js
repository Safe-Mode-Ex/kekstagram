import { DECIMAL_RADIX, MAX_SCALE_VALUE, MIN_SCALE_VALUE, SCALE_STEP } from './const';
import { validate } from './utils';

const populateUploadImageCreator = (imgUploadInputEl, imgUploadOverlayEl) => {
  const imgUploadPreviewImageEl = imgUploadOverlayEl.querySelector('.img-upload__preview img');

  const predicateScaleControl = (target) =>
    target.classList.contains('scale__control--smaller') ||
  target.classList.contains('scale__control--bigger');

  return () => {
    const scaleEl = imgUploadOverlayEl.querySelector('.scale');
    const scaleControlValueEl = scaleEl.querySelector('.scale__control--value');
    const scaleControlSmallerEl = scaleEl.querySelector('.scale__control--smaller');
    const scaleControlBiggerEl = scaleEl.querySelector('.scale__control--bigger');

    let scaleControlValue = parseInt(scaleControlValueEl.value, DECIMAL_RADIX);
    const changeEvent = new Event('change');

    if (scaleControlValue === MAX_SCALE_VALUE) {
      scaleControlBiggerEl.disabled = true;
    }

    if (scaleControlValue === MIN_SCALE_VALUE) {
      scaleControlSmallerEl.disabled = true;
    }

    scaleEl.addEventListener('click', (evt) => {
      evt.preventDefault();

      if (!validate(evt.target, predicateScaleControl)) {
        return;
      }

      scaleControlValue = parseInt(scaleControlValueEl.value, DECIMAL_RADIX);

      const currentScaleValue = evt.target.classList.contains('scale__control--smaller')
        ? scaleControlValue - SCALE_STEP
        : scaleControlValue + SCALE_STEP;

      scaleControlValueEl.value = `${currentScaleValue}%`;
      scaleControlBiggerEl.disabled = currentScaleValue === MAX_SCALE_VALUE;
      scaleControlSmallerEl.disabled = currentScaleValue === MIN_SCALE_VALUE;

      scaleControlValueEl.dispatchEvent(changeEvent);
    });

    scaleControlValueEl.addEventListener('change', (evt) => {
      const currentScaleValue = parseInt(evt.target.value, DECIMAL_RADIX) / 100;
      imgUploadPreviewImageEl.style = `transform: scale(${currentScaleValue})`;
    });

    imgUploadPreviewImageEl.src = URL.createObjectURL(imgUploadInputEl.files[0]);
  };
};

export {populateUploadImageCreator};
