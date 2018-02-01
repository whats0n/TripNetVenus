import noUiSlider from 'nouislider';

;(() => {
  const numberPattern = /\d+/g;
  const FROM = 'from';
  const TO = 'to';

  //START HELPERS
  const valueToNumber = value => +((''+value).split(' ').join(''));

  const splitOnGroup = (value, groupLength, splitted) => {
    const re = '\\d(?=(\\d{' + (groupLength || 3) + '})+' + '$)';
    value = ''+value;
    return value.replace(new RegExp(re, 'g'), '$&' + (splitted || ' '));
  };

  const getValue = (input, min, max, defaultValue, direction) => {
    let val = input.val();

    if (!val) val = ''+defaultValue;

    let filtered = val.match( numberPattern );
    let newVal = (filtered && filtered.length) ? +(filtered.join('')) : defaultValue;

    if (newVal <= min) newVal = min;
    if (newVal >= max) newVal = max;

    return newVal;
  };
  //END HELPERS
  
  $('.js-range').each((i, range) => {
    
    //elements
    range = $(range);
    const slider = range.find('.js-range-slider');
    const sliderDOM = slider.get(0);
    const inputFrom = range.find('.js-range-from');
    const inputTo = range.find('.js-range-to');
    
    //values
    const min = +slider.data('min') || 0;
    const max = +slider.data('max') || 100;

    let start = valueToNumber(inputFrom.val()) || 0;
    let end = valueToNumber(inputTo.val()) || 0;

    //SLIDER
    noUiSlider.create(sliderDOM, {
      range: {
        'min': min,
        'max': max
      },
      start: [ start, end ],
      connect: true
    });

    sliderDOM.noUiSlider.on('update', (values, handle) => {
      const value = (+values[handle]).toFixed(0);
      let formattedValue = splitOnGroup(value, 3, ' ');
      handle ? inputTo.val(formattedValue) : inputFrom.val(formattedValue);
    });

    //INPUTS
    inputTo.on('input', e => {
      const value = getValue(inputTo, min, max, max, TO);
      const formattedValue = splitOnGroup(value);
      inputTo.val(formattedValue);
      sliderDOM.noUiSlider.set([null, value]);
    });

    inputFrom.on('input', e => {
      const value = getValue(inputFrom, min, max, min, FROM);
      const formattedValue = splitOnGroup(value);
      inputFrom.val(formattedValue);
      sliderDOM.noUiSlider.set([value, null]);
    });

  });

})();
