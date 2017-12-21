import daterangepicker from 'daterangepicker';
import {ACTIVE, DOC} from '../_constants';

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
      this.cache.main = this.options.main;
      this.cache.datepickerFrom = this.options.main.find('[data-datepicker="from"]');
      this.cache.datepickerTo = this.options.main.find('[data-datepicker="to"]');
      this.cache.select = {
      	all: this.options.main.find('[data-select]'),
      	adults: this.options.main.find('[data-select="adults"]'),
      	children: this.options.main.find('[data-select="children"]')
      };
    }

    initializeEvents() {
      this.initDatepickers();
      this.initSelect();
    }

    initDatepickers() {
    	const {datepickerFrom, datepickerTo} = this.cache;
    	const dateFormat = 'd - M - yy';
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

    //  const options = {
      //  	singleDatePicker: true,
      //  	// ranges: {
      //  	// 	cancelLabel: 'Clear'
      //  	// }
      //  };

      //  datepickerFrom.daterangepicker(Object.assign({}, options));
      //  datepickerTo.daterangepicker(Object.assign({}, options));

      //  datepickerFrom.on('hide:daterangepicker', (e,picker) => {
      //  	console.log(e,picker);
	    // });
	    
    }
    initSelect() {
    	const {all, adults, children} = this.cache.select;

    	const enableSelect = (select, single) => {
    		select = $(select);
        const input = select.find('[data-select-input]');
        const items = select.find('[data-select-item]');
				
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
      });
      DOC.on('click', e => {
        const target = $(e.target);
        if (target.closest('[data-select-prevent]').length ||
					!all.hasClass(ACTIVE)) return;
        all.removeClass(ACTIVE);
      });
    }

  }

  $('.js-form').each((i, form) => {
    new Form({
      main: $(form)
    });
  });

})();
