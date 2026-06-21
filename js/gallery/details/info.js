const populateInfo = (bigPictureEl, photoCard) => {
  const bigPictureImgEl = bigPictureEl.querySelector('.big-picture__img img');
  bigPictureImgEl.src = photoCard.url;

  const socialLikesEl = bigPictureEl.querySelector('.likes-count');
  socialLikesEl.textContent = photoCard.likes;

  const socialCommentsTotalCountEl = bigPictureEl.querySelector('.social__comment-total-count');
  socialCommentsTotalCountEl.textContent = photoCard.comments.length;

  const socialCaptionEl = bigPictureEl.querySelector('.social__caption');
  socialCaptionEl.textContent = photoCard.description;
};

export {populateInfo};
