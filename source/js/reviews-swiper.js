import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

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

initReviewsSwiper();
