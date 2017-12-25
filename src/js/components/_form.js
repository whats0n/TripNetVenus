import {ACTIVE, DOC, WIN, phoneWidth} from '../_constants';
import {getWidth} from '../_utils';

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
    	const {main} = this.options;
      this.cache.main = main;
      this.cache.datepickerFrom = main.find('[data-datepicker="from"]');
      this.cache.datepickerTo = main.find('[data-datepicker="to"]');
      this.cache.ages = main.find('.js-form-ages');
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
      this.cache.select = {
        all: main.find('[data-select]'),
        first: main.find('[data-select="child-1"]'),
        second: main.find('[data-select="child-2"]'),
        third: main.find('[data-select="child-3"]')
      };
    }

    initializeEvents() {
      this.initDatepickers();
      this.initSelectBox();
      this.initSelect();
			
      this.moveAges = this.moveAges.bind(this);
      this.moveAges();
      WIN.on('resize', this.moveAges);
    }

    initDatepickers() {
    	const {datepickerFrom, datepickerTo} = this.cache;
    	const dateFormat = 'd-M-yy';
    	const FROM = 'FROM';
    	const TO = 'TO';
    	const minFrom = new Date();
    	const minTo = new Date();
    	const getDate = (element, direction) => {
    		let date;
        try {
          date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
          date = new Date();
        }
        let newDate = 
      	direction === TO ? new Date().setDate(date.getDate() - 1) :
      	direction === FROM ? new Date().setDate(date.getDate() + 1) : date;
        return new Date(newDate);
    	};

    	const options = {
        showOtherMonths: true,
			  selectOtherMonths: true,
			  firstDay: 1,
			  dateFormat: dateFormat,
			  onClose(id) {
	        $('[data-datepicker-wrapper]')
	          .removeClass(ACTIVE);
			  },
			  beforeShow(input) {
			  	$(input)
	          .closest('[data-datepicker-wrapper]')
	          .addClass(ACTIVE);
			  }
      };

	    datepickerFrom.datepicker(Object.assign({
			  minDate: minFrom
	    }, options));
	    datepickerTo.datepicker(Object.assign({
			  minDate: new Date(minTo.setDate(minTo.getDate() + 1))
	    }, options));

	    datepickerFrom.on('change', function() {
	      datepickerTo.datepicker('option', 'minDate', getDate(this, FROM));
	    });
	    datepickerTo.on('change', function() {
	      datepickerFrom.datepicker('option', 'maxDate', getDate(this, TO));
	    });
    }

    initSelectBox() {
    	const {all, adults, children} = this.cache.selectBox;
    	const {ages} = this.cache;

    	const enableSelect = (select, single) => {
    		select = $(select);
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
    	};

      adults.each((i, select) => {
      	enableSelect(select, true);
      });
      children.each((i, select) => {
      	enableSelect(select);
        $(select).find('[data-select-box-item]').on('click', e => ages.attr('data-items', $(e.currentTarget).data('value')));
      });
      DOC.on('click', e => {
        const target = $(e.target);
        if (target.closest('[data-select-box-prevent]').length ||
					!all.hasClass(ACTIVE)) return;
        all.removeClass(ACTIVE);
      });
    }

    initSelect() {
      const {select} = this.cache;
      select.all.each((i, select) => {
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

    moveAges() {
    	const {ages, containers} = this.cache;
    	getWidth(phoneWidth)
    		? ages.appendTo(containers.ages.mobile) 
    		: ages.appendTo(containers.ages.default);
    }

  }

  $('.js-form').each((i, form) => {
    new Form({
      main: $(form)
    });
  });

})();
