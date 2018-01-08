import {ACTIVE, HIDDEN} from '../_constants';

;(() => {

  const items = $('.js-item-row');
  const toggleItem = (lines, state) => lines.each((i, line) => {
  	if (i >= 2) $(line).toggleClass(HIDDEN); 
  });

  items.each((i, item) => {
    item = $(item);
    const toggle = item.find('.js-item-row-toggle');
    const lines = item.find('.js-item-row-line');

    toggleItem(lines);
    toggle.on('click', e => {
    	e.preventDefault();
      toggle.toggleClass(ACTIVE);
      toggleItem(lines);
    });
  });

})();
