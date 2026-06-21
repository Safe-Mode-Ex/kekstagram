import { createGallery } from './gallery/gallery.js';
import { createUpload } from './upload/upload.js';

const photoCardsContainerEl = document.querySelector('.pictures');

createGallery(photoCardsContainerEl);
createUpload(photoCardsContainerEl);
