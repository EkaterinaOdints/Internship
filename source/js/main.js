import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const body = document.querySelector('body');

const initHeroSwiper = () => {
  const heroSwiper = new Swiper('.hero-swiper-js', {
    modules: [Pagination],
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.hero-swiper-pagination-js',
      clickable: true,
      bulletElement: 'button',
    },
    breakpoints: {
      1440: {
        allowTouchMove: false,
      }
    },
  });

  const swiper = heroSwiper.el;
  const pagination = swiper.querySelector('.hero-swiper-pagination-wrapper-js');

  const setPaginationPosition = () => {
    const currentSlide = swiper.querySelector('.swiper-slide-active');
    const textWrapper = currentSlide.querySelector('.hero-swiper-text-js');
    pagination.style.bottom = `${textWrapper.offsetHeight - pagination.offsetHeight}px`;
  };

  setPaginationPosition();

  let resizeTimeout;

  const updatePagination = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setPaginationPosition();
    }, 100);
  };

  window.addEventListener('resize', updatePagination);

  const hidePagination = () => {
    pagination.style.opacity = 0;
  };

  const showPagination = () => {
    setPaginationPosition();
    pagination.style.opacity = 1;
  };

  heroSwiper.on('setTransition', hidePagination);
  heroSwiper.on('transitionEnd', showPagination);
};

const initMenu = () => {
  const header = body.querySelector('.page-header');
  const navigation = body.querySelector('.navigation-js');
  const menuButton = navigation.querySelector('.navigation-button-js');
  const menu = navigation.querySelector('.menu-js');
  const menuLinkCollection = menu.querySelectorAll('.menu-link-js');
  const submenuCollection = menu.querySelectorAll('.menu-item-sub-js');

  const SUBMENU_MARGIN_TOP = 15;
  let isMenuOpened = false;

  const updateCollectionTabIndex = (collection, tabIndex) => {
    collection.forEach((link) => link.setAttribute('tabindex', tabIndex));
  };

  const openSubmenu = (submenuList) => {
    submenuList.style.height = `${submenuList.scrollHeight}px`;
    submenuList.style.marginTop = `${SUBMENU_MARGIN_TOP}px`;

    const submenuLinkCollection = submenuList.querySelectorAll('.submenu-link-js');

    updateCollectionTabIndex(submenuLinkCollection, 0);
  };

  const closeSubmenu = (submenuList) => {
    submenuList.style.height = null;
    submenuList.style.marginTop = null;

    const submenuLinkCollection = submenuList.querySelectorAll('.submenu-link-js');

    updateCollectionTabIndex(submenuLinkCollection, -1);
  };

  const toggleSubmenu = (evt) => {
    const item = evt.target.parentNode;
    const submenuList = item.querySelector('.submenu-js');

    if (item.classList.contains('menu__item--opened')) {
      closeSubmenu(submenuList);
    } else {
      openSubmenu(submenuList);
    }

    item.classList.toggle('menu__item--opened');
  };

  const closeMenu = () => {
    submenuCollection.forEach((item) => {
      const submenuButton = item.querySelector('.submenu-button-js');
      submenuButton.removeEventListener('click', toggleSubmenu);

      closeSubmenu(item.querySelector('.submenu-js'));

      item.classList.remove('menu__item--opened');
    });

    updateCollectionTabIndex(menuLinkCollection, -1);

    menu.setAttribute('aria-hidden', 'true');
    body.classList.remove('overlay');
    header.classList.remove('menu-opened');

    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscapeClick);

    isMenuOpened = false;
  };

  const openMenu = () => {
    submenuCollection.forEach((item) => {
      const submenuButton = item.querySelector('.submenu-button-js');
      submenuButton.addEventListener('click', toggleSubmenu);
    });

    updateCollectionTabIndex(menuLinkCollection, 0);

    menu.removeAttribute('aria-hidden');
    body.classList.add('overlay');
    header.classList.add('menu-opened');

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onEscapeClick);

    isMenuOpened = true;
  };

  function onDocumentClick(evt) {
    if (evt.composedPath().includes(navigation)) {
      return null;
    } else {
      closeMenu();
    }
  }

  function onEscapeClick(evt) {
    if(evt.code === 'Escape'){
      closeMenu();
    }
  }

  const toggleMenu = () => {
    if (isMenuOpened) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  menuButton.addEventListener('click', toggleMenu);
};

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

const initFeedbackForm = () => {
  const form = document.querySelector('.feedback-form');
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

  const initSelect = () => {
    const selectWrapper = form.querySelector('.select-wrapper-js');
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
  };

  initSelect();
};

initHeroSwiper();
initMenu();
initFeedbackModal();
initFeedbackForm();
