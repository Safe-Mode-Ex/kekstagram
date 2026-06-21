import { render } from '../../core/render.js';
import { createPhotoCardElement } from '../../core/template';
import { debounce, isButton } from '../../shared/utils';
import { getSortedPhotoCards } from './sort.js';
import { setFilterState } from './state.js';

const renderWithDebounce = debounce(render);

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
    setFilterState(filtersEl, target);

    renderWithDebounce(
      photoCardsContainerEl,
      createPhotoCardElement,
      photoCardsToRender,
      true,
      '.picture',
    );
  });
};

export {initializeFilter};
