import { CLASS_HIDDEN, DECIMAL_RADIX, MAX_SCALE_VALUE, MIN_SCALE_VALUE, NUMBER_REGEXP, SCALE_STEP } from './const';
import { validate } from './utils';

const effectMap = {
  chrome: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    unit: '',
  },
};

const populateUploadImageCreator = (imgUploadInputEl, imgUploadOverlayEl) => {
  const imgUploadPreviewImageEl = imgUploadOverlayEl.querySelector('.img-upload__preview img');
  const effectLevelEl = imgUploadOverlayEl.querySelector('.effect-level');
  const effectLevelSliderEl = imgUploadOverlayEl.querySelector('.effect-level__slider');
  const effectsListEl = imgUploadOverlayEl.querySelector('.effects__list');

  const predicateScaleControl = (target) =>
    target.classList.contains('scale__control--smaller') ||
    target.classList.contains('scale__control--bigger');

  const predicateEffectTarget = (target) => target.name === 'effect';

  const effectLevel = noUiSlider
    .create(effectLevelSliderEl, {
      start: 1,
      connect: 'lower',
      range: {
        min: 0,
        max: 1,
      },
    });

  effectLevelEl.classList.add(CLASS_HIDDEN);

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

    effectLevel.on('update', (evt) => {
      const filter = imgUploadPreviewImageEl.style.filter;
      const filterValue = evt[0];

      effectLevelEl.value = filterValue;
      imgUploadPreviewImageEl.style.filter = filter.replace(NUMBER_REGEXP, filterValue);
    });

    effectsListEl.addEventListener('change', ({target}) => {
      if (!validate(target, predicateEffectTarget)) {
        return;
      }

      const {value: effect} = target;

      if (effect === 'none') {
        effectLevelEl.classList.add(CLASS_HIDDEN);
        imgUploadPreviewImageEl.style = '';
        return;
      }

      const {range, step, filter, unit} = effectMap[effect];
      effectLevelSliderEl.noUiSlider.updateOptions({range, step, start: range.max});
      effectLevelEl.classList.remove(CLASS_HIDDEN);
      imgUploadPreviewImageEl.style = `filter: ${filter}(${range.max}${unit})`;
    });
  };
};

export {populateUploadImageCreator};
