import {BODY, OVERFLOW_HIDDEN, HTML} from './_constants';

export const isTouch = () => 'ontouchstart' in window;

export const getWidth = width => window.matchMedia(`(max-width: ${width}px)`).matches;

export const getSliderButton = (direction, classList) => `<button class="btn-direction btn-direction_${direction} ${classList}"><svg class="icon icon-${direction}"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-${direction}"></use></svg></button>`;
export const getIcon = (direction, classList) => `<svg class="icon icon-${direction}"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-${direction}"></use></svg>`;

export const updateSvgSpriteIcon = icon => {
  const use = icon.querySelector('use');
  const value = use.getAttribute('xlink:href');
  use.setAttribute('xlink:href', value);
};

export const toggleBodyScroll = (state) => BODY.hasClass(OVERFLOW_HIDDEN) || !state ? BODY.removeClass(OVERFLOW_HIDDEN) : BODY.addClass(OVERFLOW_HIDDEN);
