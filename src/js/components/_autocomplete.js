import autoComplete from 'js-autocomplete';
import {getIcon} from '../_utils';

;(() => {
  const icon = getIcon('check');

  $('.js-autocomplete').each((i, autocomplete) => {
    autocomplete = $(autocomplete);

    const input = autocomplete.find('.js-autocomplete-input').get(0);
    const dataList = autocomplete
      .find('.js-autocomplete-list li')
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
        return `<div class="autocomplete-suggestion v-autocomplete__item" data-val="${item}">${icon}${item.replace(re, '<b>$1</b>')}</div>`;
      },
      source: function(term, suggest) {
        term = term.toLowerCase();
        const matches = dataList.filter(item => item.toLowerCase().includes(term));
        suggest(matches);
      }
    });
  });

})();
