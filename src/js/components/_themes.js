import {WIN, OWL_DEFAULT, phoneWidthEnd} from '../_constants';
import {getWidth} from '../_utils';

;(() => {

  const slider = $('.js-themes-slider');

  WIN.on('load resize', () => {
    const winWidth = getWidth(phoneWidthEnd);
    const inited = slider.hasClass(OWL_DEFAULT);

    if (winWidth && !inited) {
      slider
        .addClass(OWL_DEFAULT)
        .owlCarousel({
          items: 1,
          stagePadding: 22,
          loop: true,
          scrollPerPage: true,
          nav: false,
          dots: false
        });
    } else if (!winWidth && inited) {
      slider
        .removeClass(OWL_DEFAULT)
        .trigger('destroy.owl.carousel');
    }
  });

})();
