import { AVATAR_SIZE } from '../shared/const.js';
import { closeNotification, openNotification } from '../shared/notification.js';
import { isEscapeKey } from '../shared/utils.js';

const photoCardTemplateEl = document.querySelector('#picture')
  .content.querySelector('.picture');
const dataErrorTemplateEl = document.querySelector('#data-error')
  .content.querySelector('.data-error');
const successTemplateEl = document.querySelector('#success')
  .content.querySelector('.success');
const errorTemplateEl = document.querySelector('#error')
  .content.querySelector('.error');

const createPhotoCardElement = (photoCard) => {
  const photoCardEl = photoCardTemplateEl.cloneNode(true);
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

  const avatarEl = document.createElement('img');
  avatarEl.classList.add('social__picture');
  avatarEl.src = avatar;
  avatarEl.alt = name;
  avatarEl.width = AVATAR_SIZE;
  avatarEl.height = AVATAR_SIZE;

  const textEl = document.createElement('p');
  textEl.classList.add('social__text');
  textEl.textContent = message;

  commentEl.append(avatarEl, textEl);
  return commentEl;
};

const createDataErrorElement = () => dataErrorTemplateEl.cloneNode(true);

const createResponseElement = (isSuccess = true) => {
  const templateEl = isSuccess ? successTemplateEl : errorTemplateEl;
  const element = templateEl.cloneNode(true);
  const elementClassName = isSuccess ? 'success' : 'error';

  const predicateTargetElement = (target) =>
    !target.classList.contains(elementClassName) &&
    !target.classList.contains(`${elementClassName}__button`);

  const removeElement = (currentTarget) => {
    element.remove();
    closeNotification();
    currentTarget.removeEventListener('click', onElementClick);
    document.removeEventListener('keydown', onEscKeydown);
  };

  function onElementClick (evt) {
    evt.preventDefault();
    if (predicateTargetElement(evt.target)) {
      return;
    }
    removeElement(evt.currentTarget);
  }

  function onEscKeydown (evt) {
    if (!isEscapeKey(evt)) {
      return;
    }
    removeElement(evt.currentTarget);
  }

  element.addEventListener('click', onElementClick);
  document.addEventListener('keydown', onEscKeydown);
  openNotification();

  return element;
};

export {
  createPhotoCardElement,
  createCommentElement,
  createDataErrorElement,
  createResponseElement,
};
