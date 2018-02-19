;(() => {

  $('.js-hero-slider').owlCarousel({
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
