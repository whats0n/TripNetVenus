import {ACTIVE, OPEN, PHONE, WIN, DOC, OVERLAY, phoneWidth} from '../_constants';
import {getWidth, toggleBodyScroll} from '../_utils';

;(() => {

  const btn = $('.js-btn-nav');
  const nav = $('.js-nav');

  const reset = () => {
    btn.removeClass(ACTIVE);
    nav.removeClass(OPEN);
    toggleBodyScroll(false);
  };

  const setNavAnimation = () => {
    const activeWidth = getWidth(phoneWidth);

    if (activeWidth && !nav.hasClass(PHONE)) {
      nav.addClass(PHONE);
    } else if (!activeWidth && nav.hasClass(PHONE)) {
      reset();
      nav.removeClass(PHONE);
    }
  };

  btn.on('click', e => {
    e.preventDefault();
    btn.toggleClass(ACTIVE);
    nav.toggleClass(OPEN);
    toggleBodyScroll(nav.hasClass(OPEN));
  });

  DOC.on('click', e => {
    const target = $(e.target);

    if (target.closest('.js-btn-nav').length ||
      target.closest('.js-nav-inner').length ||
      !nav.hasClass(OPEN)) return;

    reset();
  });
  
  setNavAnimation();
  WIN.on('resize', () => {
    setNavAnimation();
  });

})();
