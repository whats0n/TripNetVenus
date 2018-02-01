import {WIN, BODY, tabletWidthEnd} from '../_constants';
import {toggleBodyScroll, getWidth} from '../_utils';

;(() => {

  const FILTERS_OPENED = 'is-filters-opened';
  const filters = $('.js-filters');
  const control = $('.js-filters-control');
  const closeButton = $('.js-filters-close');
  const container = $('.js-filters-container');

  const show = () => {
    BODY.addClass(FILTERS_OPENED);
    toggleBodyScroll(true);
  };

  const hide = () => {
    BODY.removeClass(FILTERS_OPENED);
    toggleBodyScroll(false);
  };

  control.on('click', e => {
    e.preventDefault();
    show();
  });

  filters.on('click', e => {
    const target = $(e.target);
    if (target.closest(container).length) return;
    hide();
  });

  closeButton.on('click', e => {
    e.preventDefault();
    hide();
  });

  WIN.on('resize', e => {
    if (BODY.hasClass(FILTERS_OPENED) && !getWidth(tabletWidthEnd)) hide();
  });

})();
