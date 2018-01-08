import {sliderButton} from '../_utils';

export default (() => {

  $('.js-item-box-slider').owlCarousel({
    items: 1,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    animateOut: 'fadeOut',
    nav: true,
    navText: [sliderButton('prev'), sliderButton('next')],
    navElement: 'button',
    navClass: ['owl-prev v-item-box__arrow v-item-box__prev', 'owl-next v-item-box__arrow v-item-box__next']
  });

})();
