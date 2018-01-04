import {HTML, NO_TOUCH} from './_constants';
import {isTouch} from './_utils';

;(() => {
  if (!isTouch()) HTML.addClass(NO_TOUCH);
})();
