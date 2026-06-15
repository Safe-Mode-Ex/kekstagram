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

  return photoCardEl;
};

export {createPhotoCardElement};
