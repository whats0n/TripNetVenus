;(() => {

  $('[data-scrollto]').each((i, control) => {
    control = $(control);
    const section = $(`[data-scrollto-section="${control.data('scrollto')}"]`);
    const submenu = $('.js-submenu');
    const HTMLBODY = $('html, body');
    
    if (!section.length) return;
    
    control.on('click', e => {
      e.preventDefault();
      HTMLBODY.animate({
        scrollTop: section.offset().top - submenu.outerHeight()
      }, 700);
    });
  });

})();
