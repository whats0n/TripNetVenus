import {OPEN, WIN, GALLERY_RESIZED} from '../_constants';
import connect from '../_connect';

;(() => {

  const watch = [];

  $('.js-location-item').each((i, item) => {
		
    item = $(item);
    const control = item.find('.js-location-item-control');
    const points = item.find('.js-location-item-point');
    const content = item.find('.js-location-item-content');

    const contentHeight = content.outerHeight();

    const setState = () => {
	    const pointsHeight = points.toArray().reduce((prev, next) => prev + next.offsetHeight, 0);

	    content.removeAttr('data-visible');
      control.attr('data-visible', pointsHeight > contentHeight);
      pointsHeight > contentHeight && content.attr('data-visible', control.hasClass(OPEN));
    };

    setState();
    watch.push(setState);

    control.on('click', e => {
      e.preventDefault();
      control.toggleClass(OPEN);
      content.attr('data-visible', control.hasClass(OPEN));
    });

  });

  connect.subscribe(GALLERY_RESIZED, (e) => {
  	if (!$(e.currentTarget).find('.js-location-item').length) return;
    watch.forEach(fn => fn());
  });

})();
