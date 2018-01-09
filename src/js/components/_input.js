import {ACTIVE} from '../_constants';

;(() => {

  $('.js-input').each((i, input) => {
    input = $(input);
    const field = input.find('.js-input-field');

    field.on('blur', () => {
      field.val() ? input.addClass(ACTIVE) : input.removeClass(ACTIVE);
    });

    input.clearField = function() {
      field.val('');
      input.removeClass(ACTIVE);
    };
  });

})();
