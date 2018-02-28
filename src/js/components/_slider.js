import {tabletWidthStart, desktopWidthStart} from '../_constants';
import {getIcon} from '../_utils';

;(() => {

  $('.js-slider').owlCarousel({
    items: 1,
    stagePadding: 22,
    loop: false,
    scrollPerPage: true,
    nav: false,
    dots: false,
    lazyLoad: true,
    navText: [getIcon('prev'), getIcon('next')],
    navElement: 'button',
    navClass: ['owl-prev btn-direction btn-direction_prev v-slider__prev', 'owl-next btn-direction btn-direction_next v-slider__next'],
    dotsClass: 'owl-dots v-slider__dots v-slider__dots_simple',
    dotClass: 'owl-dot v-slider__dot',
    slideBy: 'page',
    responsive: {
      [desktopWidthStart]: {
        nav: true,
        dots: true,
        stagePadding: 0,
        items: 3
      },
      [tabletWidthStart]: {
        items: 2,
        stagePadding: 0,
        dots: true
      }
    }
  });

})();
