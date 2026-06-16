import {createPhotoCards} from './data';
import {createPhotoCardElement} from './template';
import {render} from './render';
import { initializeModal } from './modal';

const photoCards = createPhotoCards();
const photoCardsContainerEl = document.querySelector('.pictures');
const bigPictureEl = document.querySelector('.big-picture');

render(photoCardsContainerEl, photoCards, createPhotoCardElement);
initializeModal(photoCardsContainerEl, bigPictureEl);
