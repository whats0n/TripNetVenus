import {OPEN, ACTIVE, DOC, phoneWidthEnd} from '../_constants';
import {getWidth} from '../_utils';

;(() => {
  const itemsName = '.js-filter-sort-item';
  const boxesName = '.js-filter-sort-box';
  const labelsName = '.js-filter-sort-label';
  const controlsName = '.js-filter-sort-control';
  
  const defaultFilters = $('.js-filter-sort');
  const mobileFilters = $('.js-filter-sort-mobile');
  const allBoxes = $(boxesName);

  //start utils
  const getItems = (defaultFilter, mobileFilter) => {
    return {
      defaultItems: defaultFilter.find(itemsName),
      mobileItems: mobileFilter.find(itemsName)
    };
  };

  const removeActive = (otherItems, otherMobileItems, otherLabels) => {
    otherItems
      .add(otherMobileItems)
      .add(otherLabels)
      .removeClass(ACTIVE);
  };

  const setActive = (defaultItem, mobileItem, label) => {
    defaultItem
      .add(mobileItem)
      .add(label)
      .addClass(ACTIVE);
  };
  //end utils

  defaultFilters.each((i, defaultFilter) => {
    defaultFilter = $(defaultFilter);
    const family = defaultFilter.data('sort');
    const mobileFilter = mobileFilters.filter(`[data-sort="${family}"]`);

    //elements
    const {defaultItems, mobileItems} = getItems(defaultFilter, mobileFilter);
    const labels = defaultFilter.find(labelsName);
    const boxes = defaultFilter.find(boxesName);
    const control = defaultFilter.find(controlsName);

    //open filters on click on the control
    control.on('click', e => {
      defaultFilter.toggleClass(ACTIVE);
    });

    //open dropdown on click on the label
    labels.each((i, label) => {
      label = $(label);
      const box = label.closest(boxes);
      const otherBoxes = boxes.not(box);

      label.on('click', e => {
        e.preventDefault();
        otherBoxes.removeClass(OPEN);
        box.toggleClass(OPEN);
      });
    });


    //set active item
    defaultItems.each((i, item) => {
      item = $(item);
      const currentMobileItem = mobileItems.filter(`[data-sort-val="${item.data('sort-val')}"]`);

      const otherItems = defaultItems.not(item);
      const otherMobileItems = mobileItems.not(currentMobileItem);
      
      const box = item.closest(boxesName);
      const otherBoxes = boxes.not(box);

      const currentLabel = box.find(labelsName);
      const otherLabels = labels.not(currentLabel);

      //set active on click on the item
      item
        .add(currentMobileItem)
        .on('click', e => {
          e.preventDefault();

          removeActive(otherItems, otherMobileItems, otherLabels);
          setActive(item, currentMobileItem, currentLabel);

          box.removeClass(OPEN);
          if (getWidth(phoneWidthEnd)) return;
          defaultFilter.removeClass(ACTIVE);
        });

      //set active on load
      if (item.hasClass(ACTIVE)) {
        setActive(item, currentMobileItem, currentLabel);
      } else if (!defaultItems.hasClass(ACTIVE) && i === 0) {
        setActive(item, currentMobileItem, currentLabel);
      }
    });
  });

  DOC.on('click', e => {
    if ($(e.target).closest(defaultFilters).length || $(e.target).closest(mobileFilters).length) return;
    if (defaultFilters.hasClass(ACTIVE)) defaultFilters.removeClass(ACTIVE);
    if (allBoxes.hasClass(OPEN)) allBoxes.removeClass(OPEN);
  });

})();
