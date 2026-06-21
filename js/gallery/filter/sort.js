import { RANDOM_PHOTO_CARDS_COUNT } from '../../shared/const';
import { getRandomInteger } from '../../shared/utils';

const SortStrategy = {
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const getSortedPhotoCards = (photoCards, sortId) => {
  const strategy = sortId.slice(sortId.indexOf('-') + 1);

  const sortStrategy = {
    random: () => getRandomInteger(-1, 1),
    discussed: (photoA, photoB) => photoB.comments.length - photoA.comments.length,
  };

  let photoCardsToRender = [];

  switch (strategy) {
    case SortStrategy.DISCUSSED: {
      photoCardsToRender = photoCards.toSorted(sortStrategy[strategy]);
      break;
    }
    case SortStrategy.RANDOM: {
      const sortedPhotoCards = photoCards.toSorted(sortStrategy[strategy]);
      photoCardsToRender = sortedPhotoCards.slice(0, RANDOM_PHOTO_CARDS_COUNT);
      break;
    }
    default:
      photoCardsToRender = photoCards;
      break;
  }

  return photoCardsToRender;
};

export {getSortedPhotoCards};
