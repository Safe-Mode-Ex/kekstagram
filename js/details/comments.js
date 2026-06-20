import { MAX_VISIBLE_COMMENTS_COUNT } from '../const';
import { render } from '../render';
import { createCommentElement } from '../template';
import { isElementVisible, setElementVisibility } from '../utils';

const setupComments = (bigPictureEl) => {
  const socialCommentsEl = bigPictureEl.querySelector('.social__comments');
  const commentsLoaderEl = bigPictureEl.querySelector('.comments-loader');
  const socialCommentCountEl = bigPictureEl.querySelector('.social__comment-count');
  const socialCommentShownCountEl = socialCommentCountEl.querySelector('.social__comment-shown-count');

  let visibleCommentsLength = MAX_VISIBLE_COMMENTS_COUNT;
  let comments = [];

  const onCommentsLoad = (evt) => {
    evt.preventDefault();

    if (visibleCommentsLength === comments.length) {
      return;
    }

    const prevCommentsLength = visibleCommentsLength;
    const nextCommentsLength = visibleCommentsLength + MAX_VISIBLE_COMMENTS_COUNT;
    const hasNextChunk = nextCommentsLength < comments.length;

    visibleCommentsLength = Math.min(nextCommentsLength, comments.length);
    socialCommentShownCountEl.textContent = visibleCommentsLength;

    if (!hasNextChunk) {
      setElementVisibility(commentsLoaderEl, false);
    }

    render(
      socialCommentsEl,
      createCommentElement,
      comments.slice(prevCommentsLength, visibleCommentsLength),
    );
  };

  return {
    initializeComments: (photoCardComments) => {
      comments = photoCardComments;

      if (isElementVisible(socialCommentCountEl)) {
        setElementVisibility(socialCommentCountEl, true);
        setElementVisibility(commentsLoaderEl, true);
      }

      if (comments.length <= MAX_VISIBLE_COMMENTS_COUNT) {
        setElementVisibility(socialCommentCountEl, false);
        setElementVisibility(commentsLoaderEl, false);
      } else {
        socialCommentShownCountEl.textContent = visibleCommentsLength;
        commentsLoaderEl.addEventListener('click', onCommentsLoad);
      }

      render(
        socialCommentsEl,
        createCommentElement,
        comments.slice(0, visibleCommentsLength),
        true
      );
    },
    destroyComments: () => {
      socialCommentsEl.innerHTML = '';
      visibleCommentsLength = MAX_VISIBLE_COMMENTS_COUNT;
      setElementVisibility(commentsLoaderEl, true);
      commentsLoaderEl.removeEventListener('click', onCommentsLoad);
    }
  };
};

export {setupComments};
