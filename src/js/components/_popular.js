import {OPEN, ACTIVE, WIN} from '../_constants';

;(() => {

  const showControl = (control, content) => (content.get(0).scrollHeight > content.get(0).clientHeight) ? control.addClass(ACTIVE) : control.removeClass(ACTIVE);

  $('.js-more').each((i, container) => {
    const _this = $(container);
    const content = _this.find('.js-more-content');
    const control = _this.find('.js-more-control');

    showControl(control, content);
    WIN.on('resize', () => showControl(control, content));

    control.click(e => {
      e.preventDefault();
      control.toggleClass(OPEN);
      content.toggleClass(OPEN);
    });
  });

})();
