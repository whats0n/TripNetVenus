import {ACTIVE, phoneWidthEnd, WIN} from '../_constants';
import {getWidth} from '../_utils';
import {ACCORDION_COMPLETE} from '../_constants';
import connect from '../_connect';

;(() => {

  class Accordion {

    constructor(options) {
      this.cache = {};
      this.options = options || {};
      this.init();
    }

    init() {
      this.initializeCache();
      this.initializeEvents();
    }

    initializeCache() {
      const {selectors, duration, main} = this.options;
      this.cache.diration = duration || 300;
      //elements
      this.cache.main = main;

      this.cache.items = main.find(selectors.item);
      this.cache.btns = main.find(selectors.btn);
      this.cache.containers = main.find(selectors.container);
    }

    initializeEvents() {
      this.active = this.getActive();
      this.toggleOnClick();
      WIN.on('resize', () => {
        this.resetStyles();
        this.active = this.getActive();
      });
    }

    getActive() {
      return getWidth(this.options.activeWidth);
    }

    resetStyles() {
		  if ((this.options.activeWidth && this.getActive()) || !this.active) return;
		  this.cache.containers.removeAttr('style');
		  this.cache.btns.removeClass(ACTIVE);
    }

    toggleOnClick() {
      const {containers, btns, items, duration} = this.cache;
      const {selectors, multiple} = this.options;
      
      items.each((i, item) => {
        item = $(item);
        const activeContainer = item.find(selectors.container);
        const activeBtn = item.find(selectors.btn);

        activeBtn.on('click', e => {
          if (this.options.activeWidth && !this.getActive()) return;
          e.preventDefault();
          
          //close on click if it's active
          if (activeBtn.hasClass(ACTIVE)) {
            activeBtn.removeClass(ACTIVE);
            activeContainer.slideUp(duration);
          } else {
            //close other if accordion is not multiple
            if (!multiple) {
              btns.removeClass(ACTIVE);
              containers.slideUp(duration);
            }
            //open active
            activeBtn.addClass(ACTIVE);
            activeContainer.slideDown(duration, () => connect.fire(ACCORDION_COMPLETE, { container: activeContainer }));
          }
        });
      });
    }

  };

  $('[data-accordion-main*="phone"]').each((i, accordion) => new Accordion({ 
    main: $(accordion),
    activeWidth: phoneWidthEnd,
    selectors: {
      item: '[data-accordion-item]',
      btn: '[data-accordion-btn]',
      container: '[data-accordion-container]'
    }
  }));

  $('[data-accordion-main*="desktop"]').each((i, accordion) => new Accordion({ 
    main: $(accordion),
    selectors: {
      item: '[data-accordion-item]',
      btn: '[data-accordion-btn]',
      container: '[data-accordion-container]'
    }
  }));

})();
