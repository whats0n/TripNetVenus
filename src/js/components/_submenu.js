import {ACTIVE, FIXED, DOC, WIN} from '../_constants';

;(() => {

  class Submenu {

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
      const {container} = this.options;

      this.cache.container = container;
      this.cache.inner = container.find('.js-submenu-inner');
      this.cache.list = container.find('.js-submenu-list');
      this.cache.link = container.find('.js-submenu-link');
      this.cache.btn = container.find('.js-submenu-btn');
      this.cache.value = container.find('.js-submenu-value');
      this.cache.sections = $('[data-scrollto-section]');
    }

    initializeEvents() {
      this.handleOnLinkClick();
      this.handleOnBtnClick();
      this.handleOnDocumentClick();
      this.detectPosition();

      WIN.on('scroll', () => this.detectPosition());
    }

    handleOnLinkClick() {
      const {link, value} = this.cache;

      link.on('click', e => {
        e.preventDefault();
        const _this = $(e.currentTarget);

        link.removeClass(ACTIVE);
        this.setActive(_this);
        this.close();
      });
    }

    handleOnBtnClick() {
      const {btn, container} = this.cache;

      btn.on('click', e => {
        const _this = $(e.currentTarget);
        container.hasClass(ACTIVE) ? this.close() : this.open();
      });
    }

    handleOnDocumentClick() {
      DOC.on('click', e => {
        const target = $(e.target);
        if (target.closest('.js-submenu').length ||
          !this.cache.container.hasClass(ACTIVE)) return;
        this.close();
      });
    }

    detectPosition() {
      const {link, sections, container, inner} = this.cache;
      container.css('min-height', inner.outerHeight());

      const winTop = WIN.scrollTop();
      const winHeight = WIN.outerHeight();
      const winBottom = winTop + winHeight;
      const containerHeight = container.outerHeight();
      

      if (winTop >= container.offset().top) {
        container.addClass(FIXED);
      } else {
        container.removeClass(FIXED);
      }

      sections.each((i, section) => {
        const _this = $(section);
        const target = _this.data('scrollto-section');
        const offset = _this.offset();
        const height = +_this.outerHeight().toFixed();
        const control = link.filter(`[data-scrollto="${target}"]`);
        const top = +offset.top.toFixed();
        
        if (!control.length) return;
        
        if (top <= winTop + containerHeight && top + height > winTop + containerHeight) {
          this.setActive(control);
        } else {
          control.removeClass(ACTIVE);;
        }
      });
    }

    setActive(control) {
      const text = control.text();
      control.addClass(ACTIVE);
      this.cache.value.text(text);
    }

    close() {
      this.cache.container.removeClass(ACTIVE);
    }

    open() {
      this.cache.container.addClass(ACTIVE);
    }

  }

  $('.js-submenu').each((i, submenu) => new Submenu({ container: $(submenu) }));

})();
