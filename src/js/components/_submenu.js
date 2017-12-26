import {ACTIVE, FIXED, DOC} from '../_constants';

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
    }

    initializeEvents() {
      this.handleOnLinkClick();
      this.handleOnBtnClick();
      this.handleOnDocumentClick();
    }

    handleOnLinkClick() {
      const {link, value} = this.cache;

      link.on('click', e => {
        e.preventDefault();
        const _this = $(e.currentTarget);
        const text = _this.text();

        link.removeClass(ACTIVE);
        _this.addClass(ACTIVE);
        value.text(text);
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

    close() {
      this.cache.container.removeClass(ACTIVE);
    }

    open() {
      this.cache.container.addClass(ACTIVE);
    }

  }

  $('.js-submenu').each((i, submenu) => new Submenu({ container: $(submenu) }));

})();
