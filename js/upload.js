import { CLASS_HIDDEN, DECIMAL_RADIX, MAX_SCALE_VALUE, MIN_SCALE_VALUE, NOT_FOUND_INDEX, NUMBER_REGEXP, SCALE_STEP } from './const';
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

const populateUploadImageCreator = (imgUploadInputEl, imgUploadOverlayEl, imgUploadFormEl) => {
  const imgUploadPreviewImageEl = imgUploadOverlayEl.querySelector('.img-upload__preview img');
  const effectLevelEl = imgUploadOverlayEl.querySelector('.effect-level');
  const effectLevelSliderEl = imgUploadOverlayEl.querySelector('.effect-level__slider');
  const effectsListEl = imgUploadOverlayEl.querySelector('.effects__list');
  const scaleEl = imgUploadOverlayEl.querySelector('.scale');
  const scaleControlValueEl = scaleEl.querySelector('.scale__control--value');
  const scaleControlSmallerEl = scaleEl.querySelector('.scale__control--smaller');
  const scaleControlBiggerEl = scaleEl.querySelector('.scale__control--bigger');

  const predicateScaleControl = (target) =>
    target.classList.contains('scale__control--smaller') ||
    target.classList.contains('scale__control--bigger');

  const predicateEffectTarget = (target) => target.name === 'effect';

  let scaleControlValue;
  const changeEvent = new Event('change');

  const onScaleValueChange = (evt) => {
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
  };

  const onScaleControlValueChange = (evt) => {
    const currentScaleValue = parseInt(evt.target.value, DECIMAL_RADIX) / 100;
    let transformProp = imgUploadPreviewImageEl.style.transform;
    const scaleIndex = transformProp.indexOf('scale');

    if (scaleIndex !== NOT_FOUND_INDEX) {
      const scaleParam = transformProp
        .slice(scaleIndex, transformProp.indexOf(')') + 1, scaleIndex);
      transformProp = transformProp.replace(scaleParam, '');
    }

    imgUploadPreviewImageEl.style.transform = `${transformProp} scale(${currentScaleValue})`;
  };

  const onEffectChange = ({target}) => {
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
  };

  effectLevelEl.classList.add(CLASS_HIDDEN);

  const creator = () => {
    scaleControlValue = parseInt(scaleControlValueEl.value, DECIMAL_RADIX);
    scaleControlSmallerEl.disabled = scaleControlValue === MIN_SCALE_VALUE;
    scaleControlBiggerEl.disabled = scaleControlValue === MAX_SCALE_VALUE;

    scaleEl.addEventListener('click', onScaleValueChange);
    scaleControlValueEl.addEventListener('change', onScaleControlValueChange);

    imgUploadPreviewImageEl.src = URL.createObjectURL(imgUploadInputEl.files[0]);

    noUiSlider
      .create(effectLevelSliderEl, {
        start: 1,
        connect: 'lower',
        range: {
          min: 0,
          max: 1,
        },
      });

    effectLevelSliderEl.noUiSlider.on('update', (evt) => {
      const filter = imgUploadPreviewImageEl.style.filter;
      const filterValue = evt[0];

      effectLevelEl.value = filterValue;
      imgUploadPreviewImageEl.style.filter = filter.replace(NUMBER_REGEXP, filterValue);
    });

    effectsListEl.addEventListener('change', onEffectChange);
  };

  creator.clean = () => {
    imgUploadFormEl.reset();
    effectLevelSliderEl.noUiSlider.destroy();
    effectLevelEl.classList.add(CLASS_HIDDEN);
    imgUploadPreviewImageEl.src = '';
    imgUploadPreviewImageEl.style = '';

    scaleEl.removeEventListener('click', onScaleValueChange);
    scaleControlValueEl.removeEventListener('change', onScaleControlValueChange);
    effectsListEl.removeEventListener('change', onEffectChange);
  };

  return creator;
};

export {populateUploadImageCreator};
