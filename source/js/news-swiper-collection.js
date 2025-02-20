import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';

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

initNewsSwiperCollection();
