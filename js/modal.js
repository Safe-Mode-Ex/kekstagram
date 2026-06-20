import { CLASS_HIDDEN, CLASS_MODAL_OPEN } from './const';
import { isEscapeKey, isFormFieldFocused, notificationState, validate } from './utils';

const initializeModal = ({eventName, triggerEl, modalEl, predicate, modalOpenCb}) => {
  const onModalOpen = (evt) => {
    if (!validate(evt.target, predicate)) {
      return;
    }

    evt.preventDefault();

    const closeBtnEl = modalEl.querySelector('.cancel');

    const toggleModal = () => {
      if (modalEl.classList.contains(CLASS_HIDDEN)) {
        modalEl.classList.remove(CLASS_HIDDEN);
      } else {
        modalEl.classList.add(CLASS_HIDDEN);
      }
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
      if (isEscapeKey(closeEvt) && !isFormFieldFocused(closeEvt) && !notificationState.isOpen) {
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
