import {sliderButton} from '../_utils';
import {slickTabletWidth, slickPhoneWidth} from '../_constants';

;(() => {

  $('.js-gallery').slick({
    prevArrow: sliderButton('prev', 'v-gallery__prev'),
    nextArrow: sliderButton('next', 'v-gallery__next'),
    dots: true,
    dotsClass: 'slick-dots v-gallery__dots',
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: slickTabletWidth,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
      	breakpoint: slickPhoneWidth,
      	settings: {
      		arrows: false,
      		dots: false,
      		slidesToShow: 1,
      		slidesToScroll: 1,
      		centerMode: true,
      		centerPadding: '34px',
      		focusOnSelect: true
      	}
      }
    ]
  });

})();
