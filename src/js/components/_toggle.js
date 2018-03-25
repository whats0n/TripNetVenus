import {WIN, ACTIVE, OPEN} from '../_constants';

export default class Toggle {
  constructor(options) {
    this.cache = {};
    this.options = options || {};
    this.init();
  }

  init() {
    this.showControl = this.showControl.bind(this);
    this.initializeCache();
    this.initializeEvents();
  }

  initializeCache() { 
    this.cache.container = $(this.options.container);
    this.cache.control = this.cache.container.find('.js-toggle-control');
    this.cache.content = this.cache.container.find('.js-toggle-content');
  }

  initializeEvents() {
    this.cache.control.on('click', e => {
      e.preventDefault();
      this.cache.control.toggleClass(ACTIVE);
      this.cache.content.toggleClass(OPEN);
    });
    
    this.showControl();
    Toggle.watching(this.showControl);
  }

  reset() {
    this.cache.control.removeClass(ACTIVE);
    this.cache.control.attr('hidden', true);
    this.cache.content.removeClass(OPEN);
  }

  showControl() {
    this.reset();
    const contentDOM = this.cache.content.get(0);
    const clientHeight = contentDOM.clientHeight;
    const scrollHeight = contentDOM.scrollHeight;
    const state = clientHeight >= scrollHeight;

    this.cache.control.attr('hidden', state);
  }

  //static 
  static watching(props) {
    if (!Toggle.watch || !Toggle.watch.length) Toggle.watch = [];
    Toggle.watch.push(props);
  }

  static onResize() {
    WIN.on('resize', () => {
      if (Toggle.watch && Toggle.watch.length) Toggle.watch.forEach(fn => fn());
    });
  }
}

Toggle.onResize();
