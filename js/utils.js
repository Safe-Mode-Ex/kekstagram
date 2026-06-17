import { CLASS_HIDDEN, DECIMAL_RADIX, NOT_FOUND_INDEX } from './const';

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

const isEscapeKey = (evt) => evt.key === 'Escape';

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
  const method = isShown ? 'add' : 'remove';
  element.classList[method](CLASS_HIDDEN);
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createRandomIdFromRangeGenerator,
  isEscapeKey,
  validate,
  setTransformProperty,
  setFilterProperty,
  setElementVisibility,
};
