import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

const body = document.querySelector('body');

const initHeroSwiper = () => {
  const heroSwiper = new Swiper('.hero-swiper-js', {
    modules: [Pagination],
    direction: 'horizontal',
    loop: true,
    autoHeight: true,
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
  const pagination = swiper.querySelector('.hero-swiper-controls-js');
  const bulletWrapper = pagination.querySelector('.hero-swiper-pagination-js');

  bulletWrapper.style.width = 'auto';

  const setPaginationPosition = () => {
    const currentSlide = swiper.querySelector('.swiper-slide-active');
    const textWrapper = currentSlide.querySelector('.hero-swiper-text-js');
    pagination.style.bottom = `${textWrapper.offsetHeight}px`;
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
    pagination.classList.add('hero__swiper-controls--hidden');
  };

  const showPagination = () => {
    setPaginationPosition();
    pagination.style.opacity = 1;
    pagination.classList.remove('hero__swiper-controls--hidden');
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

  const initSelect = () => {
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

  initSelect();
};

const initProgramsSwiper = () => {
  new Swiper('.programs-swiper-js', {
    modules: [Navigation, Scrollbar],
    direction: 'horizontal',
    navigation: {
      nextEl: '.programs-swiper-button-next-js',
      prevEl: '.programs-swiper-button-prev-js',
    },
    scrollbar: {
      el: '.programs-swiper-scrollbar-js',
      draggable: true,
      enabled: false,
      dragSize: 326,
    },
    slidesPerView: 'auto',
    spaceBetween: 15,
    breakpoints: {
      768: {
        slidesOffsetBefore: 45,
        slidesOffsetAfter: 45,
        spaceBetween: 30,
        scrollbar: {
          enabled: true,
        },
      },
      1440: {
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        spaceBetween: 32,
        allowTouchMove: false,
        scrollbar: {
          enabled: true,
          dragSize: 394,
        },
      }
    },
  });
};

const initNewsSwiperCollection = () => {
  const newsSwiperCollectionWrapper = document.querySelector('.news-content-js');
  const newsSwiperCollection = newsSwiperCollectionWrapper.querySelectorAll('.news-swiper-container-js');

  const BIG_SLIDE_HEIGHT = '330px';
  const SMALL_SLIDE_HEIGHT = '240px';

  const setSlideHeight = (slider) => {
    if (window.innerWidth < 768) {
      const slides = slider.querySelectorAll('.swiper-slide');
      slides.forEach((slide) => {
        slide.style.height = slide.classList.contains('news-swiper-slide--big') ? BIG_SLIDE_HEIGHT : SMALL_SLIDE_HEIGHT;
      });
    }
  };

  const updateSlideOrder = (slider, newsSwiper) => {
    const swiperWrapper = slider.querySelector('.news-swiper-wrapper-js');
    const journey = swiperWrapper.querySelector('.news-swiper-slide--journey');
    const volunteering = swiperWrapper.querySelector('.news-swiper-slide--volunteering');
    if (window.innerWidth >= 768 && window.innerWidth < 1440) {
      swiperWrapper.insertBefore(volunteering, journey);
    }

    if (window.innerWidth < 768 && window.innerWidth >= 320 || window.innerWidth >= 1440) {
      swiperWrapper.insertBefore(journey, volunteering);
    }

    newsSwiper.update();
  };

  newsSwiperCollection.forEach((container) => {
    const id = container.id;
    const slider = container.querySelector('.news-swiper-js');

    const newsSwiper = new Swiper(slider, {
      modules: [Navigation, Pagination, Grid],
      direction: 'horizontal',
      navigation: {
        nextEl: `#${id} .news-swiper-button-next-js`,
        prevEl: `#${id} .news-swiper-button-prev-js`,
      },
      pagination: {
        el: `#${id} .news-swiper-pagination-js`,
        clickable: true,
        bulletElement: 'button',
        type: 'bullets',
        dynamicBullets: true,
        dynamicMainBullets: 3,
      },
      grid: {
        rows: 2,
      },
      slidesPerView: 'auto',
      spaceBetween: 20,
      breakpoints: {
        768: {
          slidesPerGroup: 2,
          spaceBetween: 30,
          grid: {
            rows: 2,
          },
        },
        1440: {
          slidesPerGroup: 3,
          spaceBetween: 32,
          grid: {
            rows: 1,
          },
        }
      },
    });

    updateSlideOrder(slider, newsSwiper);
    setSlideHeight(slider);

    newsSwiper.on('resize', () => {
      updateSlideOrder(slider, newsSwiper);
      setSlideHeight(slider);
    });
  });
};

const initAccordionCollection = () => {
  const accordionCollection = document.querySelectorAll('.accordion-item-js');

  accordionCollection.forEach((accordion) => {
    const input = accordion.querySelector('input');

    input.addEventListener('input', () => {
      accordion.classList.toggle('accordion-item--active');
    });
  });
};

const initReviewsSwiper = () => {
  new Swiper('.reviews-swiper-js', {
    modules: [Navigation, Scrollbar],
    direction: 'horizontal',
    navigation: {
      nextEl: '.reviews-swiper-button-next-js',
      prevEl: '.reviews-swiper-button-prev-js',
    },
    scrollbar: {
      el: '.reviews-swiper-scrollbar-js',
      draggable: true,
      enabled: false,
      dragSize: 326,
    },
    slidesPerView: 'auto',
    spaceBetween: 15,
    breakpoints: {
      768: {
        slidesOffsetBefore: 45,
        slidesOffsetAfter: 45,
        spaceBetween: 30,
        scrollbar: {
          enabled: true,
          dragSize: 326,
        },
      },
      1440: {
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        spaceBetween: 32,
        scrollbar: {
          enabled: true,
          dragSize: 394,
        },
      }
    },
  });
};

initHeroSwiper();
initMenu();
initFeedbackModal();
initFeedbackForm();
initProgramsSwiper();
initNewsSwiperCollection();
initAccordionCollection();
initReviewsSwiper();
