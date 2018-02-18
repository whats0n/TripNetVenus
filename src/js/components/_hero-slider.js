;(() => {

  $('.js-hero-slider').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    mouseDrag: false,
    touchDrag: false,
    lazyLoad:true,
    items: 1,
    animateOut: 'fadeOut'
  });

})();
