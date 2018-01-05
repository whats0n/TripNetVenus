import {ACTIVE, OPEN, DOC, WIN, phoneWidth} from '../_constants';
import {getWidth, toggleBodyScroll} from '../_utils';

;(() => {

  class Form {
	
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
      const main = $('.js-form');
      this.cache.main = main;
      this.cache.inner = main.find('.js-form-inner');
      this.cache.ages = main.find('.js-form-ages');
      this.cache.datepickers = main.find('[data-datepicker]');
      this.cache.selects = main.find('[data-select]');
      this.cache.control = $('.js-form-control');
      this.cache.containers = {
        ages: {
          default: main.find('.js-form-ages-container-default'),
          mobile: main.find('.js-form-ages-container-mobile')
        }
      };
      this.cache.selectBox = {
      	all: main.find('[data-select-box]'),
      	adults: main.find('[data-select-box="adults"]'),
      	children: main.find('[data-select-box="children"]')
      };
    }

    initializeEvents() {
      this.initDatepickers();
      this.initSelectBox();
      this.initSelect();
      this.toggleOnClick();
			
      this.moveAges();
      WIN.on('resize', () => this.moveAges());
    }

    initDatepickers() {
      const {datepickers} = this.cache;

      const toggleFieldState = e => {
        const input = $(e.target);
        const field = input.closest('[data-datepicker-item]');
        switch (e.type) {
          case 'show':
            field.addClass(ACTIVE);
            return;
          case 'hide':
            field.removeClass(ACTIVE);
            return;
        }
      };

      datepickers.each((i, datepicker) => {
        datepicker = $(datepicker);
        const inputs = datepicker.find('[data-datepicker-input]');

        datepicker
          .datepicker({
            format: 'dd-M-yy',
            autoclose: true,
            keyboardNavigation: false,
            maxViewMode: 0,
            weekStart: 1,
            daysOfWeekHighlighted: [0,6],
            inputs: inputs
          })
          .on('show', toggleFieldState)
          .on('hide', toggleFieldState);

      });
    }

    initSelectBox() {
    	const {all, adults, children} = this.cache.selectBox;
    	const {ages, selects} = this.cache;

      adults.each((i, select) => this.addSelectBoxHandlers($(select), true));

      children.each((i, select) => {
        select = $(select);

        this.addSelectBoxHandlers(select);
        
        select
          .find('[data-select-box-item]')
          .on('click', e => {
            const target = $(e.currentTarget);
            const value = target.data('value');

            ages.attr('data-items', value);

            selects.each((i, currentSelect) => {
              currentSelect = $(currentSelect);
              if (+currentSelect.data('select') > value && currentSelect.val().length) {
                currentSelect.val(null).trigger('change.select2');
              }
            });
          });
      });

      DOC.on('click', e => {
        const target = $(e.target);
        if (target.closest('[data-select-box-prevent]').length ||
					!all.hasClass(ACTIVE)) return;
        all.removeClass(ACTIVE);
      });
    }

    initSelect() {
      const {selects} = this.cache;
      selects.each((i, select) => {
      	const _this = $(select);
      	const placeholder = _this.data('placeholder');
      	const container = _this.closest('[data-select-container]');
      	_this.select2({
	      	minimumResultsForSearch: Infinity,
      		placeholder: placeholder,
      		dropdownParent: container
      	});
      });
    }

    addSelectBoxHandlers(select, single) {
      const {all} = this.cache.selectBox;
      const input = select.find('[data-select-box-input]');
      const items = select.find('[data-select-box-item]');
      
      input.on('click', e => {
        if (select.hasClass(ACTIVE)) {
          select.removeClass(ACTIVE);
        } else {
          all.removeClass(ACTIVE);
          select.addClass(ACTIVE);
        }
      });

      items.on('click', e => {
        const that = $(e.currentTarget);
        const value = that.data('value');
        input.val(value);
        items.removeClass(ACTIVE);
        that.addClass(ACTIVE);
        if (single) select.removeClass(ACTIVE);
      });
    }

    toggleOnClick() {
      const {control, main, inner} = this.cache;

      control.on('click', e => {
        e.preventDefault();
        main.toggleClass(OPEN);
        toggleBodyScroll(main.hasClass(OPEN));
      });

      main.on('click', e => {
        e.preventDefault();
        if ($(e.target).closest(inner).length) return;
        toggleBodyScroll(false);
        main.removeClass(OPEN);
      });
    }

    moveAges() {
    	const {ages, containers} = this.cache;
    	getWidth(phoneWidth)
    		? ages.appendTo(containers.ages.mobile) 
    		: ages.appendTo(containers.ages.default);
    }

  }

  new Form();

})();
