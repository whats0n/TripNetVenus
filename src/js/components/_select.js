$('.js-select').each((i, container) => {
  container = $(container);
  const select = container.find('.js-select-field');
  const placeholder = select.data('placeholder');

  select.select2({
    minimumResultsForSearch: Infinity,
    placeholder: placeholder,
    dropdownParent: container
  });
});
