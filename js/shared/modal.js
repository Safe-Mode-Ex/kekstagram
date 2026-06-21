import { CLASS_MODAL_OPEN } from './const.js';
import { isNotificationOpen } from './notification.js';
import {
  isElementHidden,
  isEscapeKey,
  isFormFieldFocused,
  setElementVisibility,
  validate
} from './utils.js';

const initializeModal = ({eventName, triggerEl, modalEl, predicate, modalOpenCb}) => {
  const closeBtnEl = modalEl.querySelector('.cancel');

  const onModalOpen = (evt) => {
    if (!validate(evt.target, predicate)) {
      return;
    }

    evt.preventDefault();

    const toggleModal = () => {
      const isHidden = isElementHidden(modalEl);
      setElementVisibility(modalEl, isHidden);
    };

    const closeModal = () => {
      toggleModal();
      document.body.classList.remove(CLASS_MODAL_OPEN);
      closeBtnEl.removeEventListener('click', onModalCloseClick);
      document.removeEventListener('keydown', onModalCloseKeyDown);
      if (modalOpenCb?.clean) {
        modalOpenCb.clean();
      }
    };

    function onModalCloseClick (closeEvt) {
      closeEvt.preventDefault();
      closeModal(closeEvt);
    }

    function onModalCloseKeyDown (closeEvt) {
      if (isEscapeKey(closeEvt) &&
          !isFormFieldFocused(closeEvt) &&
          !isNotificationOpen()) {
        closeModal();
      }
    }

    toggleModal();
    closeBtnEl.addEventListener('click', onModalCloseClick);
    if (modalOpenCb) {
      modalOpenCb(evt.target, closeModal);
    }

    document.addEventListener('keydown', onModalCloseKeyDown);
    document.body.classList.add(CLASS_MODAL_OPEN);
  };

  triggerEl.addEventListener(eventName, onModalOpen);
};

export {initializeModal};
