import {OPEN, DOC, WIN, phoneWidthEnd, tabletWidthEnd, LOADER_OPEN} from '../_constants';
import {toggleBodyScroll, getWidth} from '../_utils';
import connect from '../_connect';

;(() => {

  const controls = $('.js-modal-control');
  const modals = $('.js-modal');
  const MOBILE = 'mobile';
  const TABLET = 'tablet';
  const watch = [];

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
    const media = modal.data('modal-media');
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

    //reset modal state on resize
    switch (media) {
      case MOBILE:
        watch.push(() => {
          !getWidth(phoneWidthEnd) && modal.hasClass(OPEN) && hide();
        });
        return;
      case TABLET:
        watch.push(() => {
          !getWidth(phoneWidthEnd) && modal.hasClass(OPEN) && hide();
        });
        return;
    }
  });

  watch.length && WIN.on('resize', e => watch.forEach(fn => fn()));

  connect.subscribe(LOADER_OPEN, () => {
    toggleBodyScroll(false);
    modals.removeClass(OPEN);
  });

})();
