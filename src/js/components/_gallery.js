import {getIcon} from '../_utils';
import {tabletWidthStart, desktopWidthStart} from '../_constants';

;(() => {

  $('.js-slider').owlCarousel({
    // items: 1.203,
    items: 1,
    stagePadding: 27,
    loop: true,
    scrollPerPage: true,
    nav: false,
    dots: false,
    navText: [getIcon('prev'), getIcon('next')],
    navElement: 'button',
    navClass: ['owl-prev btn-direction btn-direction_prev v-slider__prev', 'owl-next btn-direction btn-direction_next v-slider__next'],
    dotsClass: 'owl-dots v-slider__dots',
    dotClass: 'owl-dot v-slider__dot',
    slideBy: 'page',
    responsive: {
      [desktopWidthStart]: {
        nav: true,
        dots: true,
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
