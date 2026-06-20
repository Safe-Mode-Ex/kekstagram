import { isEscapeKey, notificationState } from './utils';

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
    notificationState.isOpen = false;
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
  notificationState.isOpen = true;


  return element;
};

export {
  createPhotoCardElement,
  createCommentElement,
  createDataErrorElement,
  createResponseElement,
};
