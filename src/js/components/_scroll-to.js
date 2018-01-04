;(() => {

  $('[data-scrollto]').each((i, control) => {
    const _this = $(control);
    const section = $(`[data-scrollto-section="${_this.data('scrollto')}"]`);
    const submenu = $('.js-submenu');
    const HTMLBODY = $('html, body');
    
    if (!section.length) return;
    
    _this.on('click', e => {
      e.preventDefault();
      HTMLBODY.animate({
        scrollTop: section.offset().top - submenu.outerHeight()
      }, 700);
    });
  });

})();
