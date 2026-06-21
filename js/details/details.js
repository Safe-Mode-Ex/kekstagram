import { setupComments } from './comments';
import { populateInfo } from './info';

const populateDetailsCreator = (photoCards, bigPictureEl) => {
  const {initializeComments, destroyComments} = setupComments(bigPictureEl);

  const creator = (photoCardEl) => {
    const photoCardId = Number(photoCardEl.closest('.picture').dataset.id);
    const photoCard = photoCards.find(({id}) => id === photoCardId);

    initializeComments(photoCard.comments);
    populateInfo(bigPictureEl, photoCard);
  };

  creator.clean = () => {
    destroyComments();
  };

  return creator;
};

export {populateDetailsCreator};
