import {OPEN, ACTIVE, DOC, phoneWidthEnd} from '../_constants';
import {getWidth} from '../_utils';

;(() => {
  const itemsName = '.js-sort-item';
  const boxesName = '.js-sort-box';
  const labelsName = '.js-sort-label';
  const controlsName = '.js-sort-control';
  
  const sorts = $('.js-sort');
  const mobileSorts = $('.js-sort-mobile');
  const allBoxes = $(boxesName);

  //start utils
  const getItems = (sort, mobileSort) => {
    return {
      defaultItems: sort.find(itemsName),
      mobileItems: mobileSort.find(itemsName)
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

  sorts.each((i, sort) => {
    sort = $(sort);
    const family = sort.data('sort');
    const mobileSort = mobileSorts.filter(`[data-sort="${family}"]`);

    //elements
    const {defaultItems, mobileItems} = getItems(sort, mobileSort);
    const labels = sort.find(labelsName);
    const boxes = sort.find(boxesName);
    const control = sort.find(controlsName);

    //open filters on click on the control
    control.on('click', e => {
      sort.toggleClass(ACTIVE);
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
          sort.removeClass(ACTIVE);
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
    if ($(e.target).closest(sorts).length || $(e.target).closest(mobileSorts).length) return;
    if (sorts.hasClass(ACTIVE)) sorts.removeClass(ACTIVE);
    if (allBoxes.hasClass(OPEN)) allBoxes.removeClass(OPEN);
  });

})();
