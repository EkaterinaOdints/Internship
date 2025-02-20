const initFeedbackFormCollection = () => {
  const formCollection = document.querySelectorAll('.feedback-form');

  formCollection.forEach((form) => {
    const submitButton = form.querySelector('.feedback-form-button-js');
    const inputCollection = form.querySelectorAll('.input-js');

    inputCollection.forEach((input) => {
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          input.classList.remove('invalid');
        }
      });
    });

    const checkFormValidity = () => {
      inputCollection.forEach((input) => {
        if (!input.checkValidity()) {
          input.classList.add('invalid');
        }
      });
    };

    submitButton.addEventListener('click', checkFormValidity);

  });
};

initFeedbackFormCollection();
