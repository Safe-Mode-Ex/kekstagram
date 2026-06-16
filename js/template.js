const templateEl = document.querySelector('#picture').content.querySelector('.picture');

const createPhotoCardElement = (photoCard) => {
  const photoCardEl = templateEl.cloneNode(true);
  const photoCardImageEl = photoCardEl.querySelector('.picture__img');
  const photoCardInfoEl = photoCardEl.querySelector('.picture__info');
  const photoCardCommentsEl = photoCardInfoEl.querySelector('.picture__comments');
  const photoCardLikesEl = photoCardInfoEl.querySelector('.picture__likes');

  photoCardImageEl.src = photoCard.url;
  photoCardImageEl.alt = photoCard.description;
  photoCardCommentsEl.textContent = photoCard.comments.length;
  photoCardLikesEl.textContent = photoCard.likes;
  photoCardEl.dataset.id = photoCard.id;

  return photoCardEl;
};

const commentTemplateEl = document.querySelector('.social__comment');

const createCommentElement = (comment) => {
  const commentEl = commentTemplateEl.cloneNode(true);
  const socialPictureEl = commentEl.querySelector('.social__picture');
  const socialTextEl = commentEl.querySelector('.social__text');

  socialPictureEl.src = comment.avatar;
  socialTextEl.textContent = comment.message;

  return commentEl;
};

export {createPhotoCardElement, createCommentElement};
