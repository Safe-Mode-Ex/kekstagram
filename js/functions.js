const NUMBER_REGEXP = /\d+/g;

const checkIsRightLength = (string, length) => string.length <= length;

const checkIsPalinfrom = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reverserString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reverserString += normalizedString[i];
  }
  return normalizedString === reverserString;
};

const exctactNaturalNumber = (string) => {
  if (Number.isNaN(string)) {
    throw Error('Type of parameter <string> is NaN');
  }

  const safeString = (typeof string === 'number') ? string.toString() : string;
  const digitsString = safeString.match(NUMBER_REGEXP);

  if (!digitsString) {
    return 'NaN';
  }

  return Number(digitsString.reduce((result, value) => result + value, ''));
};
