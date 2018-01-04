import PerfectScrollbar from 'perfect-scrollbar';
import Tabs from './_tabs';

;(() => {

  Tabs.forEach(tab => tab.on('change', (props) => {
    const scrollable = props.container.find('.js-scrollbar');
    scrollable.length && scrollable.each((i, scrollbar) => scrollbar.ps && scrollbar.ps.update());
  }));

  $('.js-scrollbar').each((i, scrollbar) => {
    scrollbar.ps = new PerfectScrollbar(scrollbar);
  });

})();
