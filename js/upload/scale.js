import { DECIMAL_RADIX, MAX_SCALE_VALUE, MIN_SCALE_VALUE, SCALE_STEP } from '../const';
import { setTransformProperty, validate } from '../utils';

const predicateScaleControl = (target) =>
  target.classList.contains('scale__control--smaller') ||
    target.classList.contains('scale__control--bigger');

const setupScale = (imgUploadOverlayEl, imgUploadPreviewImageEl) => {
  const scaleEl = imgUploadOverlayEl.querySelector('.scale');
  const scaleControlValueEl = scaleEl.querySelector('.scale__control--value');
  const scaleControlSmallerEl = scaleEl.querySelector('.scale__control--smaller');
  const scaleControlBiggerEl = scaleEl.querySelector('.scale__control--bigger');

  const changeEvent = new Event('change');

  const setScaleControlsDisabledState = (value) => {
    scaleControlSmallerEl.disabled = value === MIN_SCALE_VALUE;
    scaleControlBiggerEl.disabled = value === MAX_SCALE_VALUE;
  };

  const onScaleValueChange = (evt) => {
    evt.preventDefault();

    if (!validate(evt.target, predicateScaleControl)) {
      return;
    }

    const prevScaleValue = parseInt(scaleControlValueEl.value, DECIMAL_RADIX);

    const currentScaleValue = evt.target.classList.contains('scale__control--smaller')
      ? prevScaleValue - SCALE_STEP
      : prevScaleValue + SCALE_STEP;

    scaleControlValueEl.value = `${currentScaleValue}%`;
    setScaleControlsDisabledState(currentScaleValue);
    scaleControlValueEl.dispatchEvent(changeEvent);
  };

  const onScaleControlValueChange = ({target}) => {
    setTransformProperty(imgUploadPreviewImageEl, 'scale', target.value);
  };

  return {
    initializeScale: () => {
      const scaleValue = parseInt(scaleControlValueEl.value, DECIMAL_RADIX);
      setScaleControlsDisabledState(scaleValue);

      scaleEl.addEventListener('click', onScaleValueChange);
      scaleControlValueEl.addEventListener('change', onScaleControlValueChange);
    },
    destroyScale: () => {
      scaleEl.removeEventListener('click', onScaleValueChange);
      scaleControlValueEl.removeEventListener('change', onScaleControlValueChange);
    }
  };
};

export {setupScale};
