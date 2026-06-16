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

const createCommentElement = ({name, avatar, message}) => {
  const commentEl = document.createElement('li');
  commentEl.classList.add('social__comment');

  commentEl.innerHTML = `
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35"
    >
    <p class="social__text">${message}</p>
`;
  return commentEl;
};

export {createPhotoCardElement, createCommentElement};
