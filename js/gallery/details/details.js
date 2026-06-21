import { setupComments } from './comments.js';
import { setupInfo } from './info.js';

const populateDetailsCreator = (photoCards, bigPictureEl) => {
  const {initializeComments, destroyComments} = setupComments(bigPictureEl);
  const {populateInfo} = setupInfo(bigPictureEl);

  const creator = (photoCardEl) => {
    const photoCardId = Number(photoCardEl.closest('.picture').dataset.id);
    const photoCard = photoCards.find(({id}) => id === photoCardId);

    populateInfo(photoCard);
    initializeComments(photoCard.comments);
  };

  creator.clean = () => {
    destroyComments();
  };

  return creator;
};

export {populateDetailsCreator};
