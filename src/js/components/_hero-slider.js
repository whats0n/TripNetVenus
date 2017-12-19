import slick from 'slick-carousel';

;(() => {

  const slider = $('.js-hero-slider');
  slider.slick({
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipe: false,
    pauseOnHover: false,
    pauseOnFocus: false
  });

})();
