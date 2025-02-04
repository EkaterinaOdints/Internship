import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const heroSwiperInit = () => {
  const heroSwiper = new Swiper('.hero-swiper-js', {
    modules: [Pagination],
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.hero-swiper-pagination-js',
      clickable: true,
      bulletElement: 'button',
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

const useMenu = () => {
  const body = document.querySelector('body');
  const navigation = body.querySelector('.navigation-js');
  const menuButton = navigation.querySelector('.navigation-button-js');
  const menu = navigation.querySelector('.menu-js');
  const submenuCollection = menu.querySelectorAll('.menu-item-sub-js');

  const SUBMENU_MARGIN_TOP = 15;

  const closeSubmenu = (submenuList) => {
    submenuList.style.height = null;
    submenuList.style.marginTop = null;
  };

  const setMenuHeight = () => {
    const maxHeight = document.documentElement.clientHeight - navigation.offsetHeight - navigation.offsetTop;

    menu.style.maxHeight = `${maxHeight}px`;
    menu.style.height = `${menu.scrollHeight}px`;
  };

  const toggleSubmenu = (evt) => {
    const item = evt.target.parentNode;
    const submenuList = item.querySelector('.submenu-js');

    if (item.classList.contains('menu__item--openned')) {
      closeSubmenu(submenuList);
      menu.style.height = `${menu.scrollHeight - submenuList.scrollHeight - SUBMENU_MARGIN_TOP}px`;
    } else {
      submenuList.style.height = `${submenuList.scrollHeight}px`;
      submenuList.style.marginTop = `${SUBMENU_MARGIN_TOP}px`;
      menu.style.height = `${menu.offsetHeight + submenuList.scrollHeight + SUBMENU_MARGIN_TOP}px`;
    }

    item.classList.toggle('menu__item--openned');
  };

  const toggleMenu = () => {
    if (menu.classList.contains('menu--openned')) {
      menu.style.height = null;

      submenuCollection.forEach((item) => {
        const submenuButton = item.querySelector('.submenu-button-js');
        submenuButton.removeEventListener('click', toggleSubmenu);

        closeSubmenu(item.querySelector('.submenu'));

        item.classList.remove('menu__item--openned');
      });
    } else {
      setMenuHeight();
      useSubmenu();
    }

    body.classList.toggle('overlay');
    menuButton.classList.toggle('nav-button--menu-oppened');
    menu.classList.toggle('menu--openned');
  };

  function useSubmenu() {
    submenuCollection.forEach((item) => {
      const submenuButton = item.querySelector('.submenu-button-js');
      submenuButton.addEventListener('click', toggleSubmenu);
    });
  }

  menuButton.addEventListener('click', toggleMenu);
};

heroSwiperInit();
useMenu();
