import {createPhotoCards} from './data';
import {createPhotoCardElement} from './template';
import {render} from './render';

const photoCards = createPhotoCards();
render('.pictures', photoCards, createPhotoCardElement);
