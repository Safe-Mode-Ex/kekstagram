import { render } from '../render';
import { createPhotoCardElement } from '../template';
import { getRandomInteger, isButton } from '../utils';
import { getSortedPhotoCards } from './sort';
import { setFilterState } from './state';

const initializeFilter = (photoCardsContainerEl, photoCards) => {
  const filtersEl = document.querySelector('.img-filters');
  filtersEl.classList.remove('img-filters--inactive');

  filtersEl.addEventListener('click', (evt) => {
    evt.preventDefault();

    const {target} = evt;

    if (isButton(target)) {
      return;
    }

    const {id} = target;
    const photoCardsToRender = getSortedPhotoCards(photoCards, id);

    render(photoCardsContainerEl, createPhotoCardElement, photoCardsToRender, true, '.picture');
    setFilterState(filtersEl, target);
  });
};

export {initializeFilter};
