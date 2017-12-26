;(() => {
  
  const CUTTED = 'is-cutted';
  const toggleContent = (content, items, state) => {
    state
      ? content.dotdotdot({ watch: true })
      : content.trigger('destroy');
    items.each((i, item) => { i >= 4 && $(item).attr('hidden', state); });
  };

  $('.js-overview').each((i, container) => {

    const _this = $(container);
    const content = _this.find('.js-overview-content');
    const items = _this.find('.js-overview-item');
    const btn = _this.find('.js-overview-toggle');

    let state = !_this.hasClass(CUTTED);

    toggleContent(content, items, state);

    btn.on('click', e => {
      e.preventDefault();
      state = !state;
      _this.toggleClass(CUTTED);
      toggleContent(content, items, state);
    });

    $(window).on('resize', () => {
      toggleContent(content, items, state);
    });
  });

})();
