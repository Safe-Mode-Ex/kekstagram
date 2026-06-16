import {createPhotoCards} from './data';
import {createPhotoCardElement} from './template';
import {render} from './render';
import { initializeModal } from './modal';
import { populateBigPictureImgCreator } from './gallery';

const photoCardsContainerEl = document.querySelector('.pictures');
const bigPictureEl = document.querySelector('.big-picture');

const photoCards = createPhotoCards();
const populateBigPictureImg = () => populateBigPictureImgCreator(photoCards, bigPictureEl);

render(photoCardsContainerEl, photoCards, createPhotoCardElement);
initializeModal(photoCardsContainerEl, bigPictureEl, '.picture', populateBigPictureImg());
