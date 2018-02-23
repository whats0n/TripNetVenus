import {tabletWidthStart, tabletWidthEnd, WIN, ACTIVE, OPEN} from '../_constants';
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
    const slider = item.find('.js-items-slider');
    const toggle = item.find('.js-items-toggle');
    const content = item.find('.js-items-content');

    toggle.on('click', e => {
      e.preventDefault();
      toggle.toggleClass(ACTIVE);
      content.toggleClass(OPEN);
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
