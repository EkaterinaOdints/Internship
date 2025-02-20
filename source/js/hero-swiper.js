import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

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

initHeroSwiper();
