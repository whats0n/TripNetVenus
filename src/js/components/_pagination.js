;(() => {

  const PREV = 'prev';
  const NEXT = 'next';

  const buldControl = direction => `
    ${(direction === NEXT) ? '<span>Next</span>' : ''}
    <svg class="icon icon-${direction} ">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-${direction}"></use>
    </svg>
    ${(direction === PREV) ? '<span>Previous</span>' : ''}
  `;
  
  const prevControl = buldControl(PREV);
  const nextControl = buldControl(NEXT);


  $('.js-list').each((i, container) => {
    container = $(container);
    const pagination = container.find('.js-list-pagination');
    const items = container.find('.js-list-item');
    const itemsOnPage = +container.data('list-show') || 4;
    const current = container.find('.js-list-current');
    
    container
      .find('.js-list-total')
      .text(Math.ceil(items.length/itemsOnPage));

    pagination.pagination({
      items: items.length,
      itemsOnPage: itemsOnPage,
      cssStyle: 'v-pagination',
      displayedPages: 3,
      edges: 1,
      ellipsePageSet: false,
      prevText: prevControl,
      nextText: nextControl,

      onInit() {
        items
          .filter((i, item) => i >= itemsOnPage)
          .attr('hidden', true);
        current.text(1);
      },

      onPageClick(page) {
        const onPage = page*itemsOnPage - 1;
        const min = onPage - itemsOnPage;
        const max = onPage;
        items.each((i, item) => i <= min || i > max ? $(item).attr('hidden', true) : $(item).attr('hidden', false));
        current.text(page);
      }
    });

  });

})();
