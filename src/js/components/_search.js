import {ACTIVE, phoneWidthEnd, tabletWidthEnd, DOC} from '../_constants';
import {getWidth} from '../_utils';

;(() => {
	
  $('.js-search').each((i, search) => {
    search = $(search);
    const btn = search.find('.js-search-btn');

    btn.on('click', e => {
      e.preventDefault();
      if (!getWidth(phoneWidthEnd) || getWidth(tabletWidthEnd)) {
        search.toggleClass(ACTIVE);
      }
    });
  });

})();
