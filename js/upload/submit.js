import { sendData } from '../api';
import { render } from '../render';
import { createResponseElement } from '../template';

const setupSubmit = (imgUploadFormEl, hasErrors) => {
  let closeModal = null;

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (hasErrors()) {
      return;
    }

    const submitBtnEl = imgUploadFormEl.querySelector('.img-upload__submit');
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
    initializeSubmit: (close) => {
      closeModal = close;
      imgUploadFormEl.addEventListener('submit', onFormSubmit);
    },
    destroySubmit: () => {
      imgUploadFormEl.removeEventListener('submit', onFormSubmit);
    }
  };
};

export {setupSubmit};
