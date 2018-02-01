;(() => {

  const toggle = props => {
    const {state, max, items, control, more, less} = props;
    
    items.each((i, item) => {
      (i > max - 1) && $(item).attr('data-list-item', state);
    });
    more.attr('data-list-control', !state);
    less.attr('data-list-control', state);
  };

  $('[data-list]').each((i, list) => {
    list = $(list);
    const items = list.find('[data-list-item]');
    const control = list.find('[data-list-control]');
    const more = control.find('[data-list-more]');
    const less = control.find('[data-list-less]');

    const max = list.data('list');
    const length = items.length;

    //!state - means if items less then maximum - don't use functionality "more/less"
    const state = max >= length;

    //show current items on load
    const props = { max, state, items, more, less };
    toggle(props);
    
    control.attr('data-list-control', !state);
    //toggle items on click
    !state && control.on('click', e => {
      e.preventDefault();
      props.state = !props.state;
      toggle(props);
    });
  });
})();
