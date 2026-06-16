import { CLASS_HIDDEN, CLASS_MODAL_OPEN } from './const';
import { isEscapeKey } from './utils';

const initializeModal = (containerEl, modalEl, targetSelector, modalOpenCb) => {
  const onModalOpen = (evt) => {
    evt.preventDefault();

    if (!evt.target.closest(targetSelector)) {
      return;
    }

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
    };

    function onModalCloseClick (closeEvt) {
      closeEvt.preventDefault();
      closeModal(closeEvt);
    }

    function onModalCloseKeyDown (closeEvt) {
      if (isEscapeKey(closeEvt)) {
        closeModal();
      }
    }

    toggleModal();
    modalOpenCb(evt.target);
    closeBtnEl.addEventListener('click', onModalCloseClick);

    document.addEventListener('keydown', onModalCloseKeyDown);
    document.body.classList.add(CLASS_MODAL_OPEN);
  };

  containerEl.addEventListener('click', onModalOpen);
};

export {initializeModal};
