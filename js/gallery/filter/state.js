import { CLASS_ACTIVE_FILTER_BUTTON } from '../../shared/const.js';

const setFilterState = (filtersEl, target) => {
  const buttons = filtersEl.querySelectorAll('button');

  for (const button of buttons) {
    const strategy = button.id !== target.id ? 'remove' : 'add';
    button.classList[strategy](CLASS_ACTIVE_FILTER_BUTTON);
  }
};

export {setFilterState};
