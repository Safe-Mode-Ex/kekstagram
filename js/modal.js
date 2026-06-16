const initializeModal = (containerEl, modalEl) => {
  const handleModalOpen = (evt) => {
    evt.preventDefault();

    const toggleModal = () => {
      if (modalEl.classList.contains('hidden')) {
        modalEl.classList.remove('hidden');
      } else {
        modalEl.classList.add('hidden');
      }
    };

    toggleModal();

    const closeBtnEl = modalEl.querySelector('.cancel');
    const handleModalClose = (closeEvt) => {
      closeEvt.preventDefault();
      toggleModal();
      closeEvt.currentTarget.removeEventListener('click', handleModalClose);
    };

    closeBtnEl.addEventListener('click', handleModalClose);
  };

  containerEl.addEventListener('click', handleModalOpen);
};

export {initializeModal};
