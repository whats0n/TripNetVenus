import {ACTIVE, phoneWidthEnd, WIN} from '../_constants';
import {getWidth} from '../_utils';

const duration = 300;

$('.js-content').each((i, content) => {

  content = $(content);
  
  content.on('click', '.js-content-control', e => {

    e.preventDefault();

    const currentControl = $(e.currentTarget);
    const target = currentControl.data('target');
    const controls = content.find('.js-content-control');
    const currentControls = controls.filter(`[data-target="${target}"]`);

    const sections = content.find('.js-content-section');
    const currentSection = sections.filter(`[data-section="${target}"]`);

    controls.removeClass(ACTIVE);
    currentControls.addClass(ACTIVE);
    
    sections.removeClass(ACTIVE);
    currentSection.addClass(ACTIVE);

  });

});
