import { NUMBER_REGEXP } from '../../../shared/const.js';
import { setElementVisibility, setFilterProperty, validate } from '../../../shared/utils.js';
import { effectMap, sliderInitialOptions } from '../config.js';

const setupEffects = (imgUploadOverlayEl, imgUploadPreviewImageEl) => {
  const effectsListEl = imgUploadOverlayEl.querySelector('.effects__list');
  const effectLevelEl = imgUploadOverlayEl.querySelector('.effect-level');
  const effectLevelSliderEl = imgUploadOverlayEl.querySelector('.effect-level__slider');
  const predicateEffectTarget = (target) => target.name === 'effect';

  const onEffectChange = ({target}) => {
    if (!validate(target, predicateEffectTarget)) {
      return;
    }

    const {value: effect} = target;

    if (effect === 'none') {
      setElementVisibility(effectLevelEl, false);
      setFilterProperty(imgUploadPreviewImageEl, '');
      return;
    }

    const {range, step, filter, unit} = effectMap[effect];
    effectLevelSliderEl.noUiSlider.updateOptions({range, step, start: range.max});
    setElementVisibility(effectLevelEl, true);
    setFilterProperty(imgUploadPreviewImageEl, `${filter}(${range.max}${unit})`);
  };

  setElementVisibility(effectLevelEl, false);

  return {
    initializeEffects: () => {
      if (!effectLevelSliderEl.noUiSlider) {
        noUiSlider
          .create(effectLevelSliderEl, sliderInitialOptions);
      }

      effectLevelSliderEl.noUiSlider.on('update', (evt) => {
        const filter = imgUploadPreviewImageEl.style.filter;
        const filterValue = evt[0];

        effectLevelEl.value = filterValue;
        setFilterProperty(imgUploadPreviewImageEl, filter.replace(NUMBER_REGEXP, filterValue));
      });

      effectsListEl.addEventListener('change', onEffectChange);
    },
    destroyEffects: () => {
      setElementVisibility(effectLevelEl, false);
      effectLevelSliderEl.noUiSlider.destroy();
      effectsListEl.removeEventListener('change', onEffectChange);
    }
  };
};

export {setupEffects};
