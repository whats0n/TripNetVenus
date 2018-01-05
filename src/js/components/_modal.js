import {OPEN} from '../_constants';
import {toggleBodyScroll} from '../_utils';

;(() => {

  const controls = $('.js-modal-control');
  const modals = $('.js-modal');

  controls.each((i, control) => {
    control = $(control);
    const modal = modals.filter(`[data-modal="${control.data('modal')}"]`);

    control.on('click', e => {
      e.preventDefault();
      modal.toggleClass(OPEN);
      toggleBodyScroll(true);
    });
  });

  modals.each((i, modal) => {
    modal = $(modal);
    const inner = modal.find('.js-modal-inner');
    const close = modal.find('.js-modal-close');

    const hide = () => {
      toggleBodyScroll(false);
      modal.removeClass(OPEN);
    };

    modal.on('click', e => {
      if ($(e.target).closest(inner).length || $(e.target).closest(close).length ) return;
      hide();
    });

    close.on('click', e => {
      e.preventDefault();
      hide();
    });
  });

})();
