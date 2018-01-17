import {ACTIVE} from '../_constants';

;(() => {

  const setActive = (input, val) => val ? input.addClass(ACTIVE) : input.removeClass(ACTIVE);

  $('.js-input').each((i, input) => {
    input = $(input);
    const field = input.find('.js-input-field');

    setActive(input, field.val());
    field.on('blur', () => setActive(input, field.val()));

    input.clearField = function() {
      field.val('');
      input.removeClass(ACTIVE);
    };
  });

})();
