import PerfectScrollbar from 'perfect-scrollbar';
import Tabs from './_tabs';
import {WIN} from '../_constants';

;(() => {

  Tabs.forEach(tab => tab.on('change', (props) => {
    const scrollable = props.container.find('.js-scrollbar');
    scrollable.length && scrollable.each((i, container) => container.ps && container.ps.update());
  }));

  $('.js-scrollbar').each((i, container) => {
    container.ps = new PerfectScrollbar(container, { wheelPropagation: true });
    WIN.on('resize', () => container.ps && container.ps.update());
  });

})();
