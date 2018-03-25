import './_accordion';
import './_header';
import './_scrollbar';
import './_slider';
import './_lazy-load';

import Toggle from './_toggle';
import Attraction from './_attraction';

$('.js-toggle').each((i, container) => new Toggle({ container }));
$('.js-attraction').each((i, container) => new Attraction({ container }));
