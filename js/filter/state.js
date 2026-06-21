import { CLASS_ACTIVE_FILTER_BUTTON } from '../const';

const setFilterState = (filtersEl, target) => {
  const buttons = filtersEl.querySelectorAll('button');

  for (const button of buttons) {
    button.classList.remove(CLASS_ACTIVE_FILTER_BUTTON);
  }

  target.classList.add(CLASS_ACTIVE_FILTER_BUTTON);
};

export {setFilterState};
