import { COMMENT_MAX_LENGHT, HASH_TAG_REGEXP, HASH_TAGS_MAX_COUNT } from '../../../shared/const';
import { validationConfig } from '../config';

const setupValidation = (imgUploadFormEl) => {
  const hashTagInputEl = imgUploadFormEl.querySelector('.text__hashtags');
  const commentTextEl = imgUploadFormEl.querySelector('.text__description');
  let validation;

  const setValidators = (instance) => {
    instance.addValidator(hashTagInputEl, (value) => {
      const hashTags = value.split(' ');
      return !value || hashTags.every((hashTag) => HASH_TAG_REGEXP.test(hashTag));
    }, 'Введён невалидный хэштег');

    instance.addValidator(hashTagInputEl, (value) => {
      const hashTags = value.split(' ');
      return !value || hashTags.length <= HASH_TAGS_MAX_COUNT;
    }, `Количество хэштегов не может быть больше ${HASH_TAGS_MAX_COUNT}`);

    instance.addValidator(hashTagInputEl, (value) => {
      const hashTags = value.split(' ');
      return !value || new Set(hashTags).size === hashTags.length;
    }, 'Хэштеги повторяются');

    instance.addValidator(
      commentTextEl,
      (value) => !value.length || value.length <= COMMENT_MAX_LENGHT,
      `Длина комментария не может быть больше ${COMMENT_MAX_LENGHT} символов`,
    );
  };

  const onHashTagChange = () => {
    validation.validate();
  };

  const onCommentInput = () => {
    validation.validate();
  };

  return {
    initializeValidation: () => {
      validation = new Pristine(imgUploadFormEl, validationConfig, false);
      setValidators(validation);
      hashTagInputEl.addEventListener('change', onHashTagChange);
      commentTextEl.addEventListener('input', onCommentInput);
    },
    hasErrors: () => {
      validation.validate();
      return validation.getErrors()?.length;
    },
    destroyValidation: () => {
      validation.destroy();
      hashTagInputEl.removeEventListener('change', onHashTagChange);
      commentTextEl.removeEventListener('input', onCommentInput);
    },
  };
};

export {setupValidation};
