import {ACTIVE, phoneWidthEnd, tabletWidthEnd, DOC} from '../_constants';
import {getWidth} from '../_utils';

;(() => {
	
  $('.js-filter-search').each((i, filter) => {
    filter = $(filter);
    const btn = filter.find('.js-filter-search-btn');

    btn.on('click', e => {
      e.preventDefault();
      if (!getWidth(phoneWidthEnd) || getWidth(tabletWidthEnd)) {
        filter.toggleClass(ACTIVE);
      }
    });
  });

})();
