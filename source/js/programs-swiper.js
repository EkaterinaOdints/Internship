import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

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

initProgramsSwiper();
