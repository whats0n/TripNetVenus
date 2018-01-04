import {sliderButton, updateSvgSpriteIcon} from '../_utils';
import {slickTabletWidth, slickPhoneWidth} from '../_constants';

;(() => {

  const slider = $('.js-slider');

  slider.slick({
    prevArrow: sliderButton('prev', 'v-slider__prev'),
    nextArrow: sliderButton('next', 'v-slider__next'),
    dots: true,
    dotsClass: 'slick-dots v-slider__dots',
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1301,
        settings: {
          arrows: false
        }
      },
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
      		centerPadding: '44px',
      		focusOnSelect: true
      	}
      }
    ]
  });

  slider.on('breakpoint', (event, slick, breakpoint ) => {
    setTimeout(() => {
      slick
        .$slides
        .find('.icon')
        .each((i, icon) => updateSvgSpriteIcon(icon));
    }, 50);
  });

})();
