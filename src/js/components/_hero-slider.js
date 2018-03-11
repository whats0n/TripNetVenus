import {isRTL} from '../_constants';

;(() => {

  $('.js-hero-slider').owlCarousel({
    rtl: isRTL,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    mouseDrag: false,
    touchDrag: false,
    items: 1,
    lazyLoad: true,
    animateOut: 'fadeOut'
  });

})();
