import {
  CLASS_HIDDEN,
  NUMBER_REGEXP,
} from '../const';
import {
  setElementVisibility,
  setFilterProperty,
  validate
} from '../utils';
import { effectMap, sliderInitialOptions } from './config';
import { setupScale } from './scale';

const populateUploadImageCreator = (imgUploadInputEl, imgUploadOverlayEl, imgUploadFormEl) => {
  const imgUploadPreviewImageEl = imgUploadOverlayEl.querySelector('.img-upload__preview img');
  const effectLevelEl = imgUploadOverlayEl.querySelector('.effect-level');
  const effectLevelSliderEl = imgUploadOverlayEl.querySelector('.effect-level__slider');
  const effectsListEl = imgUploadOverlayEl.querySelector('.effects__list');

  const {initializeScale, destroyScale} = setupScale(imgUploadOverlayEl, imgUploadPreviewImageEl);

  const predicateEffectTarget = (target) => target.name === 'effect';

  const onEffectChange = ({target}) => {
    if (!validate(target, predicateEffectTarget)) {
      return;
    }

    const {value: effect} = target;

    if (effect === 'none') {
      setElementVisibility(effectLevelEl, true);
      setFilterProperty(imgUploadPreviewImageEl, '');
      return;
    }

    const {range, step, filter, unit} = effectMap[effect];
    effectLevelSliderEl.noUiSlider.updateOptions({range, step, start: range.max});
    setElementVisibility(effectLevelEl, false);
    setFilterProperty(imgUploadPreviewImageEl, `${filter}(${range.max}${unit})`);
  };

  setElementVisibility(effectLevelEl, true);

  const creator = () => {
    imgUploadPreviewImageEl.src = URL.createObjectURL(imgUploadInputEl.files[0]);
    initializeScale();

    noUiSlider
      .create(effectLevelSliderEl, sliderInitialOptions);

    effectLevelSliderEl.noUiSlider.on('update', (evt) => {
      const filter = imgUploadPreviewImageEl.style.filter;
      const filterValue = evt[0];

      effectLevelEl.value = filterValue;
      setFilterProperty(imgUploadPreviewImageEl, filter.replace(NUMBER_REGEXP, filterValue));
    });

    effectsListEl.addEventListener('change', onEffectChange);
  };

  creator.clean = () => {
    imgUploadFormEl.reset();
    effectLevelSliderEl.noUiSlider.destroy();
    effectLevelEl.classList.add(CLASS_HIDDEN);
    imgUploadPreviewImageEl.src = '';
    imgUploadPreviewImageEl.style = '';

    destroyScale();
    effectsListEl.removeEventListener('change', onEffectChange);
  };

  return creator;
};

export {populateUploadImageCreator};
