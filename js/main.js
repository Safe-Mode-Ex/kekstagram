import {createPhotoCards} from './data';
import {createCommentElement, createPhotoCardElement} from './template';
import {render} from './render';
import { initializeModal } from './modal';

const photoCards = createPhotoCards();
const photoCardsContainerEl = document.querySelector('.pictures');
const bigPictureEl = document.querySelector('.big-picture');

const populateBigPictureImg = (photoCardEl) => {
  const photoCardId = +photoCardEl.closest('.picture').dataset.id;
  const photoCard = photoCards.find(({id}) => id === photoCardId);

  const socialCommentCountEl = bigPictureEl.querySelector('.social__comment-count');
  socialCommentCountEl.classList.add('hidden');

  const commentsLoaderEl = bigPictureEl.querySelector('.comments-loader');
  commentsLoaderEl.classList.add('hidden');

  const bigPictureImgEl = bigPictureEl.querySelector('.big-picture__img img');
  bigPictureImgEl.src = photoCard.url;

  const socialLikesEl = bigPictureEl.querySelector('.likes-count');
  socialLikesEl.textContent = photoCard.likes;

  const socialCommentsTotalCountEl = bigPictureEl.querySelector('.social__comment-total-count');
  socialCommentsTotalCountEl.textContent = photoCard.comments.length;

  const socialCaptionEl = bigPictureEl.querySelector('.social__caption');
  socialCaptionEl.textContent = photoCard.description;

  const socialCommentsEl = bigPictureEl.querySelector('.social__comments');
  render(socialCommentsEl, photoCard.comments, createCommentElement, true);
};


render(photoCardsContainerEl, photoCards, createPhotoCardElement);
initializeModal(photoCardsContainerEl, bigPictureEl, '.picture', populateBigPictureImg);
