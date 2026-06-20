import { CLASS_HIDDEN, MAX_VISIBLE_COMMENTS_COUNT } from './const';
import { render } from './render';
import { createCommentElement } from './template';

const populateBigPictureImgCreator = (photoCards, bigPictureEl) => {
  const socialCommentsEl = bigPictureEl.querySelector('.social__comments');
  const commentsLoaderEl = bigPictureEl.querySelector('.comments-loader');
  const socialCommentCountEl = bigPictureEl.querySelector('.social__comment-count');
  const socialCommentShownCountEl = socialCommentCountEl.querySelector('.social__comment-shown-count');

  let visibleCommentsLength = MAX_VISIBLE_COMMENTS_COUNT;
  let photoCard;

  const onCommentsLoad = (evt) => {
    evt.preventDefault();

    if (visibleCommentsLength === photoCard.comments.length) {
      return;
    }

    const prevCommentsLength = visibleCommentsLength;
    const nextCommentsLength = visibleCommentsLength + MAX_VISIBLE_COMMENTS_COUNT;
    const hasNextChunk = nextCommentsLength < photoCard.comments.length;

    visibleCommentsLength = Math.min(nextCommentsLength, photoCard.comments.length);
    socialCommentShownCountEl.textContent = visibleCommentsLength;

    if (!hasNextChunk) {
      commentsLoaderEl.classList.add(CLASS_HIDDEN);
    }

    render(
      socialCommentsEl,
      createCommentElement,
      photoCard.comments.slice(prevCommentsLength, visibleCommentsLength),
    );
  };

  const creator = (photoCardEl) => {
    const photoCardId = Number(photoCardEl.closest('.picture').dataset.id);
    photoCard = photoCards.find(({id}) => id === photoCardId);

    if (socialCommentCountEl.classList.contains(CLASS_HIDDEN)) {
      socialCommentCountEl.classList.remove(CLASS_HIDDEN);
      commentsLoaderEl.classList.remove(CLASS_HIDDEN);
    }

    if (photoCard.comments.length <= MAX_VISIBLE_COMMENTS_COUNT) {
      socialCommentCountEl.classList.add(CLASS_HIDDEN);
      commentsLoaderEl.classList.add(CLASS_HIDDEN);
    } else {
      socialCommentShownCountEl.textContent = visibleCommentsLength;
      commentsLoaderEl.addEventListener('click', onCommentsLoad);
    }

    const bigPictureImgEl = bigPictureEl.querySelector('.big-picture__img img');
    bigPictureImgEl.src = photoCard.url;

    const socialLikesEl = bigPictureEl.querySelector('.likes-count');
    socialLikesEl.textContent = photoCard.likes;

    const socialCommentsTotalCountEl = bigPictureEl.querySelector('.social__comment-total-count');
    socialCommentsTotalCountEl.textContent = photoCard.comments.length;

    const socialCaptionEl = bigPictureEl.querySelector('.social__caption');
    socialCaptionEl.textContent = photoCard.description;

    render(
      socialCommentsEl,
      createCommentElement,
      photoCard.comments.slice(0, visibleCommentsLength),
      true
    );
  };

  creator.clean = () => {
    socialCommentsEl.innerHTML = '';
    visibleCommentsLength = MAX_VISIBLE_COMMENTS_COUNT;
    commentsLoaderEl.classList.remove(CLASS_HIDDEN);
    commentsLoaderEl.removeEventListener('click', onCommentsLoad);
  };

  return creator;
};

export {populateBigPictureImgCreator};
