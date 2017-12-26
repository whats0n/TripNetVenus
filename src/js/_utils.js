export const getWidth = width => window.matchMedia(`(max-width: ${width}px)`).matches;
export const sliderButton = (direction, classList) => `<button class="btn-direction btn-direction_${direction} ${classList}"><svg class="icon icon-${direction}"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-${direction}"></use></svg></button>`;
