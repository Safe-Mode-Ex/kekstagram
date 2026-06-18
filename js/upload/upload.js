import { setupScale } from './scale';
import { setupEffects } from './effects';

const hashTagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
const HASH_TAGS_MAX_COUNT = 5;
const COMMENT_MAX_LENGHT = 140;

const validationConfig = {
  // class of the parent element where the error/success class is added
  classTo: 'img-upload__field-wrapper',
  // class of the parent element where error text element is appended
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const populateUploadImageCreator = (imgUploadInputEl, imgUploadOverlayEl, imgUploadFormEl) => {
  const imgUploadPreviewImageEl = imgUploadOverlayEl.querySelector('.img-upload__preview img');

  const {initializeScale, destroyScale} = setupScale(imgUploadOverlayEl, imgUploadPreviewImageEl);
  const {initializeEffects, destroyEffects} = setupEffects(imgUploadOverlayEl, imgUploadPreviewImageEl);

  const creator = () => {
    imgUploadPreviewImageEl.src = URL.createObjectURL(imgUploadInputEl.files[0]);
    initializeScale();
    initializeEffects();

    const hashTagInputEl = imgUploadFormEl.querySelector('.text__hashtags');
    const commentTextEl = imgUploadFormEl.querySelector('.text__description');
    const pristine = new Pristine(imgUploadFormEl, validationConfig, false);

    pristine.addValidator(hashTagInputEl, (value) => {
      const hashTags = value.split(' ');
      return !value || hashTags.every((hashTag) => hashTagRegExp.test(hashTag));
    }, 'Введён невалидный хэштег');

    pristine.addValidator(hashTagInputEl, (value) => {
      const hashTags = value.split(' ');
      return !value || hashTags.length <= HASH_TAGS_MAX_COUNT;
    }, `Количество хэштегов не может быть больше ${HASH_TAGS_MAX_COUNT}`);

    pristine.addValidator(hashTagInputEl, (value) => {
      const hashTags = value.split(' ');
      return !value || new Set(hashTags).size === hashTags.length;
    }, 'Хэштеги повторяются');

    pristine.addValidator(
      commentTextEl,
      (value) => !value.length || value.length <= COMMENT_MAX_LENGHT,
      `Длина комментария не может быть больше ${COMMENT_MAX_LENGHT} символов`,
    );

    hashTagInputEl.addEventListener('change', () => {
      pristine.validate();
    });

    commentTextEl.addEventListener('input', () => {
      pristine.validate();
    });

    imgUploadFormEl.addEventListener('submit', (evt) => {
      if (pristine.getErrors()?.length) {
        evt.preventDefault();
      }
    });
  };

  creator.clean = () => {
    imgUploadFormEl.reset();

    imgUploadPreviewImageEl.src = '';
    imgUploadPreviewImageEl.style = '';

    destroyScale();
    destroyEffects();
  };

  return creator;
};

export {populateUploadImageCreator};
