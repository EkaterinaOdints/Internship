const initSelectCollection = () => {
  const selectCollection = document.querySelectorAll('.select-wrapper-js');

  selectCollection.forEach((selectWrapper) => {
    const selectHidden = selectWrapper.querySelector('.select-wrapper-hidden-item-js');
    const selectHiddenOptionArray = Array(...selectHidden.querySelectorAll('.select-hidden-option-js'));
    const select = selectWrapper.querySelector('.select-js');
    const selectButton = select.querySelector('.select-button-js');
    const selectList = select.querySelector('.select-list-js');
    const selectListItemCollection = selectList.querySelectorAll('.select-list-item-js');

    selectHidden.value = null;

    const closeSelect = () => {
      select.classList.remove('select--opened');
    };

    const onDocumentClick = (evt) => {
      if (evt.composedPath().includes(select)) {
        return null;
      } else {
        closeSelect();
      }
    };

    document.addEventListener('click', onDocumentClick);

    const toggleChosenItem = (evt) => {
      const item = evt.target;
      const activeItem = selectHidden.querySelector('[selected="selected"]');

      selectButton.textContent = item.textContent;

      if (activeItem) {
        activeItem.removeAttribute('selected');
      }

      const selectedHiddenOption = selectHiddenOptionArray.find((element) => element.value === item.id);
      selectedHiddenOption.setAttribute('selected', 'selected');

      closeSelect();
    };

    const handleSelectClick = () => {
      if (select.classList.contains('select--opened')) {
        selectListItemCollection.forEach((item) => {
          item.removeEventListener('click', toggleChosenItem);
        });
      } else {
        selectListItemCollection.forEach((item) => {
          item.addEventListener('click', toggleChosenItem);
        });
      }

      select.classList.toggle('select--opened');
    };

    selectButton.addEventListener('click', handleSelectClick);
  });
};

initSelectCollection();
