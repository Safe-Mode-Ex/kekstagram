const MAX_PHOTOS_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 100;
const MAX_COMMENTS_COUNT = 30;
const MAX_AVATARS_COUNT = 6;
const MESSAGE_MAX_SENTENCIES_COUNT = 2;

const MESSAGE_SENTENCIES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTATORS_NAMES = ['Артём', 'Мария'];

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

const createPhotoCard = () => {
  const id = getRandomInteger(1, MAX_PHOTOS_COUNT);
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
