import {ACTIVE} from '../_constants';

;(() => {

  $('.js-input').each((i, input) => {
    const _this = $(input);
    const field = _this.find('.js-input-field');

    field.on('blur', () => {
      field.val() ? _this.addClass(ACTIVE) : _this.removeClass(ACTIVE);
    });

    input.clearField = function() {
      field.val('');
      _this.removeClass(ACTIVE);
    };
  });

})();
