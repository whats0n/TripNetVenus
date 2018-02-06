import {OPEN, LOADER_OPEN} from '../_constants';
import connect from '../_connect';

;(() => {
	
  const loader = $('.js-loader');

  $('.js-loader-control').on('click', e => {
    e.preventDefault();
    loader.addClass(OPEN);
    connect.fire(LOADER_OPEN);
    setTimeout(() => loader.removeClass(OPEN), 2000);
  });

})();
