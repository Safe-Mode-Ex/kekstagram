import {
  MESSAGE_MAX_SENTENCIES_COUNT,
  MESSAGE_SENTENCIES,
  MAX_COMMENTS_COUNT,
  MAX_AVATARS_COUNT,
  COMMENTATORS_NAMES,
  MAX_PHOTOS_COUNT,
  MIN_LIKES_COUNT,
  MAX_LIKES_COUNT
} from './const';
import {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './utils';

const createMessage = () => {
  const sentenciesCount = getRandomInteger(1, MESSAGE_MAX_SENTENCIES_COUNT);
  const sentencies = Array.from(
    {length: sentenciesCount},
    () => getRandomArrayElement(MESSAGE_SENTENCIES),
  );
  return sentencies.join(' ');
};

const createComment = () => {
  const getCommentId = createRandomIdFromRangeGenerator(1, MAX_COMMENTS_COUNT);
  const getAvatarId = createRandomIdFromRangeGenerator(1, MAX_AVATARS_COUNT);

  return {
    id: getCommentId(),
    avatar: `img/avatar-${getAvatarId()}.svg`,
    name: getRandomArrayElement(COMMENTATORS_NAMES),
    message: createMessage(),
  };
};

const getPhotoCardId = createRandomIdFromRangeGenerator(1, MAX_PHOTOS_COUNT);

const createPhotoCard = () => {
  const id = getPhotoCardId();
  const commentsCount = getRandomInteger(0, MAX_COMMENTS_COUNT);
  const comments = Array.from({length: commentsCount}, createComment);

  return {
    id,
    url: `photos/${id}.jpg`,
    description: `Фото ${id}`,
    likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments,
  };
};

const createPhotoCards = () => Array.from({length: MAX_PHOTOS_COUNT}, createPhotoCard);

export {createPhotoCards};
