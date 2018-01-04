import {ACTIVE} from '../_constants';
import autoComplete from 'js-autocomplete';
//https://goodies.pixabay.com/javascript/auto-complete/demo.html
;(() => {

  //cache
  const states = {
    from: 'from',
    to: 'to',
    full: 'full',
    empty: 'empty'
  };
  const icon = '<svg class="icon icon-marker"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-marker"></use></svg>';
  
  //utils  
  const setState = (inputFrom, inputTo, container) => {
    const state = 
      (!inputFrom.val().length && inputTo.val().length) ? states.to : 
        (inputFrom.val().length && !inputTo.val().length) ? states.from : 
          (inputFrom.val().length && inputTo.val().length) ? states.full : states.empty;

    container.attr('data-state', state);
  };
  
  $('.js-fields-group').each((i, group) => {
    const _this = $(group);

    const inputs = _this.find('.js-fields-group-input');
    const inputFrom = inputs.filter(`[data-target="${states.from}"]`);
    const inputTo = inputs.filter(`[data-target="${states.to}"]`);

    inputs.each((i, input) => {
      const dataList = $(input)
        .closest('.js-fields-group-box')
        .find('.js-fields-group-list li')
        .map((i, el) => $(el).text())
        .toArray();

      new autoComplete({
        selector: input,
        minChars: 1,
        menuClass: 'v-autocomplete',
        offsetTop: 9,
        renderItem: function(item, search) {
          search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const re = new RegExp('(' + search.split(' ').join('|') + ')', 'gi');
          return `<div class="autocomplete-suggestion v-autocomplete__item" data-val="${item}">${icon} ${item.replace(re, '<b>$1</b>')}</div>`;
        },
        source: function(term, suggest) {
          term = term.toLowerCase();
          const matches = dataList.filter(item => item.toLowerCase().includes(term));
          suggest(matches);
        }
      });
    });

    inputs.on('input', () => {
      setState(inputFrom, inputTo, _this);
    });
  });

})();
