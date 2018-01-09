import PerfectScrollbar from 'perfect-scrollbar';
import {WIN, TAB_CHANGE} from '../_constants';
import connect from '../_connect';

;(() => {

  const subs = connect.subscribe(TAB_CHANGE, props => {
  	const scrollable = props.container.find('.js-scrollbar');
  	scrollable.length && scrollable.each((i, container) => container.ps && container.ps.update());
  });

  $('.js-scrollbar').each((i, container) => {
    container.ps = new PerfectScrollbar(container, { wheelPropagation: true });
    WIN.on('resize', () => container.ps && container.ps.update());
  });

})();
