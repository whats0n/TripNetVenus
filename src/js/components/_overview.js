;(() => {
  
  const CUTTED = 'is-cutted';
  const toggleContent = (content, items, state) => {
    state
      ? content.dotdotdot({ watch: true })
      : content.trigger('destroy');
    items.each((i, item) => { i >= 4 && $(item).attr('hidden', state); });
  };

  $('.js-overview').each((i, container) => {

    container = $(container);
    const content = container.find('.js-overview-content');
    const items = container.find('.js-overview-item');
    const btn = container.find('.js-overview-toggle');

    let state = !container.hasClass(CUTTED);

    toggleContent(content, items, state);

    btn.on('click', e => {
      e.preventDefault();
      state = !state;
      container.toggleClass(CUTTED);
      toggleContent(content, items, state);
    });

    $(window).on('resize', () => {
      toggleContent(content, items, state);
    });
  });

})();
