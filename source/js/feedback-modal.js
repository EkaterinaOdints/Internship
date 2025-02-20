const body = document.querySelector('body');

const initFeedbackModal = () => {
  const openButtonCollection = document.querySelectorAll('.feedback-modal-button-js');
  const modalWrapper = document.querySelector('.feedback-modal-js');
  const modal = modalWrapper.querySelector('.feedback-modal-container-js');
  const closeButton = modal.querySelector('.feedback-modal-close-button-js');

  const closeModal = () => {
    modalWrapper.classList.remove('feedback-modal--opened');
    body.classList.remove('overlay');

    modalWrapper.removeEventListener('click', onModalWrapperClick);
    closeButton.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', onEscapeClick);
  };

  const openModal = () => {
    modalWrapper.classList.add('feedback-modal--opened');
    body.classList.add('overlay');

    modalWrapper.addEventListener('click', onModalWrapperClick);
    closeButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', onEscapeClick);
  };

  openButtonCollection.forEach((button) => {
    button.addEventListener('click', openModal);
  });

  function onModalWrapperClick(evt) {
    if (evt.composedPath().includes(modal)) {
      return null;
    } else {
      closeModal();
    }
  }

  function onEscapeClick(evt) {
    if(evt.code === 'Escape'){
      closeModal();
    }
  }
};

initFeedbackModal();
