import {ACTIVE, OPEN, DISABLED, TAB_CHANGE} from '../_constants';
import connect from '../_connect';

export default (() => {

  class Tabs {

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
      const {main} = this.options;
      this.cache.main = main;
      this.cache.controls = main.find('[data-tabs-control]');
      this.cache.containers = main.find('[data-tabs-container]');
    }

    initializeEvents() {
      this.setActiveOnLoad();
      this.setActiveOnClick();
    }

    setActiveOnLoad() {
      const {controls, containers} = this.cache;
      for (let i = 0; i < controls.length; i++) {
        const control = $(controls[i]);
        const container = this.getTabContainer(control, containers);

        if (this.checkTabState(control, container)) {
          control.addClass(DISABLED);
          continue;
        }
        this.setActiveTab(control, container);
        break;
      }
    }

    setActiveOnClick() {
      const {controls, containers} = this.cache;
      controls.each((i, control) => {
        control = $(control);
        const container = this.getTabContainer(control, containers);

        control.on('click', e => {
          e.preventDefault();
          if (this.checkTabState(control, container)|| control.hasClass(ACTIVE)) return;
          controls.removeClass(ACTIVE);
          containers.removeClass(OPEN);
          this.setActiveTab(control, container);
        });
      });
    }

    //utils
    checkTabState(control, container) {
      return control.hasClass(DISABLED) || control.attr('disabled') || !container.length;
    }

    getTabContainer(control, containers) {
      return containers.filter(`[data-tabs-container="${control.data('tabs-control')}"]`);
    }

    setActiveTab(control, container) {
      this.cache.main.attr('data-tabs', control.data('tabs-control'));
      control.addClass(ACTIVE);
      container.addClass(OPEN);
      connect.fire(TAB_CHANGE, { control, container });
    }

  };

  $('[data-tabs]').each((i, main) => new Tabs({ main: $(main) }) );

})();
