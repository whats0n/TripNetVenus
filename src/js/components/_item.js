import {tabletWidthStart, tabletWidthEnd, desktopWidthStart, WIN, ACTIVE, OPEN} from '../_constants';
import {getIcon, getWidth} from '../_utils';

export default (() => {

  const owlDefault = 'owl-carousel';
  const items = $('.js-items');
  const sliders = $('.js-items-slider');

  WIN.on('resize load', () => {
    if (getWidth(tabletWidthEnd) && !sliders.hasClass('owl-loaded')) {
      sliders
        .addClass(owlDefault)
        .owlCarousel({
          items: 1,
          center: true,
          stagePadding: 22,
          loop: true,
          nav: false,
          dots: false,
          responsive: {
            [tabletWidthStart]: {
              items: 2,
              stagePadding: 5,
              center: false
            }
          }
        });
    } else if (!getWidth(tabletWidthEnd) && sliders.hasClass('owl-loaded')) {
      sliders
        .removeClass(owlDefault)
        .trigger('destroy.owl.carousel');
    }
  });

  items.each((i, item) => {
    item = $(item);
    const carousel = item.find('.js-items-carousel');
    const toggle = item.find('.js-items-toggle');
    const content = item.find('.js-items-content');

    toggle.on('click', e => {
      e.preventDefault();
      toggle.toggleClass(ACTIVE);
      content.toggleClass(OPEN);
    });

    carousel.length && carousel.addClass(owlDefault).owlCarousel({
      items: 1,
      stagePadding: 27,
      loop: true,
      scrollPerPage: true,
      nav: false,
      dots: false,
      lazyLoad: true,
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
          stagePadding: 0,
          items: 4
        },
        [tabletWidthStart]: {
          items: 3,
          stagePadding: 0,
          dots: true
        }
      }
    });
  });

  $('.js-item-slider').owlCarousel({
    items: 1,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    animateOut: 'fadeOut',
    nav: true,
    lazyLoad: true,
    navText: [getIcon('prev'), getIcon('next')],
    navElement: 'button',
    navClass: ['owl-prev v-item__arrow v-item__prev', 'owl-next v-item__arrow v-item__next']
  });

})();
