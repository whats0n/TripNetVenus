import {WIN, ACTIVE, slickPhoneWidth, slickTabletWidth} from '../_constants';

;(() => {
  const sliderButton = (direction, classList) => `<button class="btn-direction btn-direction_${direction} ${classList}"><svg class="icon icon-${direction}"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-${direction}"></use></svg></button>`;
  const prev = sliderButton('prev', 'v-photo-gallery__prev');
  const next = sliderButton('next', 'v-photo-gallery__next');

  const addSliderToPagination = ({pagination, width, options}) => {
    const widthCondition = WIN.outerWidth() < width;
    const initialized = pagination.hasClass('slick-initialized');
    if (widthCondition && !initialized) {
      pagination.slick(options);
    } else if (!widthCondition && initialized) {
      pagination.slick('unslick');
    }
  };

  const setActive = ({items, track, gotoIndex}) => {
    if (track.hasClass('slick-initialized')) {
      track.slick('slickGoTo', gotoIndex);
    }

    items.each((i, item) => {
      item = $(item);
      if (item.closest('.slick-cloned').length || item.data('index') !== gotoIndex) {
        item.removeClass(ACTIVE);
        return;
      }
      item.addClass(ACTIVE);
    });
  };

  const counting = ({counter, current, total}) => counter.text(`${current + 1}/${total}`);

  $('.js-photo-gallery').each((i, gallery) => {
    gallery = $(gallery);
    const slideshow = gallery.find('.js-photo-gallery-slideshow');
    const counter = gallery.find('.js-photo-gallery-counter');
    const track = gallery.find('.js-photo-gallery-track');
    const items = track.find('.js-photo-gallery-item');
    const itemsWidth = items
      .toArray()
      .reduce((p,n) => p + $(n).outerWidth(), 0);
    const paginationOptions = {
      arrows: false,
      variableWidth: true,
      swipeToSlide: true,
      touchThreshold: 100,
      focusOnSelect: true,
      slidesToShow: 4
    };
    const slideshowOptions = (gallery.data('photo-gallery') !== 'details') 
      ? {
        fade: true,
        prevArrow: prev,
        nextArrow: next,
        responsive: [
          {
            breakpoint: slickPhoneWidth,
            settings: {
              arrows: false
            }
          }
        ]
      } : {
        fade: true,
        prevArrow: prev,
        nextArrow: next,
        responsive: [
          {
            breakpoint: slickTabletWidth,
            settings: {
              arrows: false,
              adaptiveHeight: true
            }
          },
          {
            breakpoint: slickPhoneWidth,
            settings: {
              arrows: false,
              dots: true,
              dotsClass: 'slick-dots v-photo-gallery__dots',
              adaptiveHeight: true
            }
          }
        ]
      };
    const initSlide = 0;

    addSliderToPagination({
      pagination: track,
      options: paginationOptions,
      width: itemsWidth
    });

    WIN.on('resize', () => addSliderToPagination({
      pagination: track,
      options: paginationOptions,
      width: itemsWidth
    }));

    slideshow.on('init', () => {
      if (gallery.data('photo-gallery') !== 'details') counting({
        counter: counter,
        current: initSlide,
        total: items.length
      });
      setActive({
        items: items,
        gotoIndex: initSlide,
        track: track
      });
    });

    slideshow.slick(slideshowOptions);

    slideshow.on('beforeChange', (e, slick, current, next) => {
      if (gallery.data('photo-gallery') !== 'details') counting({
        counter: counter,
        current: next,
        total: items.length
      });
      setActive({
        items: items,
        gotoIndex: next,
        track: track
      });
    });

    track.on('click', '.js-photo-gallery-item', e => {
      const item = $(e.currentTarget);
      const index = +item.data('index');
      slideshow.slick('slickGoTo', index);
    });

    track.on('beforeChange', (e, slick, current, next) => {
      slideshow.slick('slickGoTo', next);
    });
  });

})();
