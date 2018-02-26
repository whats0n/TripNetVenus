import {OPEN, ACTIVE} from '../_constants';

;(() => {

  $('.js-options').each((i, container) => {
    container = $(container);
    const list = container.find('.js-options-list');
    const control = container.find('.js-options-control');

    control.on('click', e => {
      e.preventDefault();
      list.toggleClass(OPEN);
      control.toggleClass(ACTIVE);
    });
  });

})();
