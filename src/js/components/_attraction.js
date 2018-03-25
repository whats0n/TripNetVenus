import {GALLERY_RESIZED, CUTTED, OPEN, ACTIVE} from '../_constants';
import connect from '../_connect';

export default class Attraction {
  constructor(options) {
    this.cache = {};
    this.options = options || {};
    this.init();
  }

  init() {
    this.toggleState = this.toggleState.bind(this);
    this.initializeCache();
    this.initializeEvents();
  }

  initializeCache() { 
    this.cache.container = $(this.options.container);
    this.cache.control = this.cache.container.find('.js-attraction-control');
    this.cache.content = this.cache.container.find('.js-attraction-content');
  }

  initializeEvents() {
    this.toggleState();
    Attraction.watching(this.toggleState);

    this.cache.control.on('click', e => {
      e.preventDefault();
      this.cache.control.toggleClass(ACTIVE);
      this.cache.content.toggleClass(OPEN);
    });
  }

  reset() {
    this.cache.control.removeClass(ACTIVE);
    this.cache.control.attr('hidden', true);
    this.cache.content.removeClass(OPEN);
    this.cache.content.addClass(CUTTED);
  }

  toggleState() {
    this.reset();
    const contentDOM = this.cache.content.get(0);
    const clientHeight = contentDOM.clientHeight;
    const scrollHeight = contentDOM.scrollHeight;
    const state = clientHeight >= scrollHeight;

    this.cache.control.attr('hidden', state);
    !state ? this.cache.content.addClass(CUTTED) : this.cache.content.removeClass(CUTTED);
  }

  //static

  static watching(props) {
    if (!Attraction.watch || !Attraction.watch.length) Attraction.watch = [];
    Attraction.watch.push(props);
  }

  static onGalleryResize() {
    connect.subscribe(GALLERY_RESIZED, (e) => {
      const target = $(e.target);
      const name = target.data('slider-name');

      if (!name || name.toLowerCase() !== 'attractions') return;
      if (Attraction.watch && Attraction.watch.length) Attraction.watch.forEach(fn => fn());
    });
  }
}

Attraction.onGalleryResize();
