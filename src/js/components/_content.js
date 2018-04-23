import {ACTIVE, phoneWidthEnd, WIN} from '../_constants';
import {getWidth} from '../_utils';

const contents = $('.js-content');
const watch = [];

const init = props => {
  const {controls, sections} = props;
  const initControl = controls.first();
  const target = initControl.data('target');
  const initControls = controls.filter(`[data-target="${target}"]`);
  const initSections = sections.filter(`[data-section="${target}"]`);

  if (controls.hasClass(ACTIVE)) return;

  initControls
    .add(initSections)
    .addClass(ACTIVE);
};

const showCurrent = props => {
  const {controls, sections, currentControls, currentSections} = props;
  controls
    .add(sections)
    .removeClass(ACTIVE);
  currentControls
    .add(currentSections)
    .addClass(ACTIVE);
};

contents.each((i, content) => {

  content = $(content);

  const controls = content.find('.js-content-control');
  const sections = content.find('.js-content-section');

  init({ controls, sections });

  watch.push(() => !getWidth(phoneWidthEnd) && init({ controls, sections }));

  controls.each((i, control) => {
    control = $(control);
    const target = control.data('target');
    const currentControls = controls.filter(`[data-target="${target}"]`);
    const currentSections = sections.filter(`[data-section="${target}"]`);

    control.on('click', e => {

      e.preventDefault();

      if (getWidth(phoneWidthEnd)) {
        if (currentControls.hasClass(ACTIVE)) {
          currentControls
            .add(currentSections)
            .removeClass(ACTIVE);
        } else {
          showCurrent({ controls, sections, currentControls, currentSections});
        }
      } else {
        showCurrent({ controls, sections, currentControls, currentSections});
      }

    });
  });
  
});

WIN.on('resize', () => watch.forEach(fn => fn()));
