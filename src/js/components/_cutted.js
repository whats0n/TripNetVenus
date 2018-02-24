import {OPEN, ACTIVE, WIN} from '../_constants';
import connect from '../_connect';
import {PAGE_CHANGED, PAGE_INITED} from '../_constants';

;(() => {

  const toggleControl = (control, state) => control.attr('hidden', state);
  const toggleContent = (content, state) => state ? content.dotdotdot({ watch: true }) : content.trigger('destroy');

  const watch = [];

  const items = $('.js-cutted');

  items.each((i, container) => {
    container = $(container);
    const control = container.find('.js-cutted-control');
    const content = container.find('.js-cutted-content');

    const contentDOM = content.get(0);

    watch.push(() => {
      //reset
      control.removeClass(ACTIVE);
      content.removeClass(OPEN);
      toggleContent(content, false);
      //check and set state
      const state = contentDOM.clientHeight >= contentDOM.scrollHeight;
      toggleControl(control, state);
      toggleContent(content, !state);
    });

    control.on('click', e => {
      e.preventDefault();
      control.toggleClass(ACTIVE);
      content.toggleClass(OPEN);
      toggleContent(content, !control.hasClass(ACTIVE));
    });
  });

  connect.subscribe(PAGE_CHANGED, props => watch.forEach(fn => fn(props)));
  connect.subscribe(PAGE_INITED, props => watch.forEach(fn => fn(props)));
  WIN.on('resize', () => watch.forEach(fn => fn()));

})();
