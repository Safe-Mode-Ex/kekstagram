const effectMap = {
  chrome: {
    filter: 'grayscale',
    range: { min: 0,max: 1 },
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    range: { min: 0,max: 1 },
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    range: { min: 0,max: 100 },
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    range: { min: 0, max: 3 },
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    range: { min: 1,max: 3 },
    step: 0.1,
    unit: '',
  },
};

const sliderInitialOptions = {
  start: 1,
  connect: 'lower',
  range: { min: 0, max: 1 },
};

const validationConfig = {
  // class of the parent element where the error/success class is added
  classTo: 'img-upload__field-wrapper',
  // class of the parent element where error text element is appended
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__field-wrapper--error'
};

export {effectMap, sliderInitialOptions, validationConfig};
