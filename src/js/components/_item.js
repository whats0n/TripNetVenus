import {getIcon} from '../_utils';

export default (() => {

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
