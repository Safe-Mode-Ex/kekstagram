import { CLASS_HIDDEN, DECIMAL_RADIX, ERROR_TIMEOUT, NOT_FOUND_INDEX } from './const';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw Error(`Перебраны все числа из диапазона от ${ min } до ${ max}`);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = ({key}) => key === 'Escape';
const isFormFieldFocused = ({target}) => target.type === 'text' || target.tagName === 'TEXTAREA';

const validate = (target, predicate) => predicate(target);

const setTransformProperty = (element, param, value) => {
  const currentScaleValue = parseInt(value, DECIMAL_RADIX) / 100;
  let transformProp = element.style.transform;
  const scaleIndex = transformProp.indexOf(param);

  if (scaleIndex !== NOT_FOUND_INDEX) {
    const scaleParam = transformProp
      .slice(scaleIndex, transformProp.indexOf(')') + 1, scaleIndex);
    transformProp = transformProp.replace(scaleParam, '');
  }

  element.style.transform = `${transformProp} ${param}(${currentScaleValue})`;
};

const setFilterProperty = (element, value) => {
  element.style.filter = value;
};

const setElementVisibility = (element, isShown) => {
  const method = isShown ? 'remove' : 'add';
  element.classList[method](CLASS_HIDDEN);
};

const cleanError = () => {
  const dataErrorTimeout = setTimeout(() => {
    const dataErrorEl = document.querySelector('.data-error');
    dataErrorEl.remove();
    clearTimeout(dataErrorTimeout);
  }, ERROR_TIMEOUT);
};

const notificationState = {
  isOpen: false,
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}


export {
  getRandomInteger,
  getRandomArrayElement,
  createRandomIdFromRangeGenerator,
  isEscapeKey,
  isFormFieldFocused,
  validate,
  setTransformProperty,
  setFilterProperty,
  setElementVisibility,
  cleanError,
  notificationState,
  debounce,
  throttle,
};
