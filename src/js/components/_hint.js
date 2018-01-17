import {ACTIVE, DOC} from '../_constants';

;(() => {

  const hints = $('.js-hint');

  hints.each((i, hint) => {
    hint = $(hint);
    hint
      .find('.js-hint-control')
      .on('click', e => {
        e.preventDefault();
        hints
          .not(hint)
          .removeClass(ACTIVE);
        hint.toggleClass(ACTIVE);
      });
  });

  DOC.on('click', e => {
    if ($(e.target).closest('.js-hint').length || !hints.hasClass(ACTIVE)) return;
    hints.removeClass(ACTIVE);
  });

})();
