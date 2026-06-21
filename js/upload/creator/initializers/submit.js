import { render } from '../../../core/render.js';
import { sendData } from '../../../shared/api.js';
import { createResponseElement } from '../../../core/template.js';

const setupSubmit = (imgUploadFormEl, hasErrors) => {
  const submitBtnEl = imgUploadFormEl.querySelector('.img-upload__submit');
  let closeModal = null;

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (hasErrors()) {
      return;
    }

    submitBtnEl.disabled = true;

    sendData(new FormData(imgUploadFormEl))
      .then(() => {
        if (closeModal) {
          closeModal();
        }
        render(document.body, () => createResponseElement());
        imgUploadFormEl.removeEventListener('submit', onFormSubmit);
      })
      .catch(() => {
        render(document.body, () => createResponseElement(false));
      })
      .finally(() => {
        submitBtnEl.disabled = false;
      });
  };

  return {
    initializeSubmit(close) {
      closeModal = close;
      imgUploadFormEl.addEventListener('submit', onFormSubmit);
    },
    destroySubmit() {
      imgUploadFormEl.removeEventListener('submit', onFormSubmit);
    }
  };
};

export {setupSubmit};
