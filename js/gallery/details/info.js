const setupInfo = (bigPictureEl) => {
  const bigPictureImgEl = bigPictureEl.querySelector('.big-picture__img img');
  const socialLikesEl = bigPictureEl.querySelector('.likes-count');
  const socialCommentsTotalCountEl = bigPictureEl.querySelector('.social__comment-total-count');
  const socialCaptionEl = bigPictureEl.querySelector('.social__caption');

  return {
    populateInfo(photoCard) {
      bigPictureImgEl.src = photoCard.url;
      socialLikesEl.textContent = photoCard.likes;
      socialCommentsTotalCountEl.textContent = photoCard.comments.length;
      socialCaptionEl.textContent = photoCard.description;
    }
  };
};

export {setupInfo};
