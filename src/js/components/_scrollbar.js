import PerfectScrollbar from 'perfect-scrollbar';
import {WIN, TAB_CHANGE, ACCORDION_COMPLETE} from '../_constants';
import connect from '../_connect';

;(() => {

  connect.subscribe(TAB_CHANGE, props => {
  	const scrollable = props.container.find('.js-scrollbar');
  	scrollable.length && scrollable.each((i, container) => container.ps && container.ps.update());
  });

  connect.subscribe(ACCORDION_COMPLETE, props => {
  	const scrollableParent = props.container.closest('.js-scrollbar');
  	const scrollableChild = props.container.find('.js-scrollbar');
  	scrollableParent.length && scrollableParent.each((i, container) => container.ps && container.ps.update());
  	scrollableChild.length && scrollableChild.each((i, container) => container.ps && container.ps.update());
  });

  $('.js-scrollbar').each((i, container) => {
    container.ps = new PerfectScrollbar(container, { wheelPropagation: true });
    WIN.on('resize', () => container.ps && container.ps.update());
  });

})();
