import { createResponseElement } from '../../../core/template.js';
import { FILE_TYPES } from '../../../shared/const.js';

const setupFile = (imgUploadInputEl, imgUploadPreviewImageEl, imgUploadOverlayEl) => {
  const previewEls = imgUploadOverlayEl.querySelectorAll('.effects__preview');

  const setPreviewsImage = (fileUrl) => {
    for (const preview of previewEls) {
      preview.style.backgroundColor = 'white';
      preview.style.backgroundImage = `url(${fileUrl})`;
    }
  };

  const validateFile = (file) => {
    const fileName = file.name.toLowerCase();
    return FILE_TYPES.some((it) => fileName.endsWith(it));
  };

  return {
    initializeFile: () => {
      const file = imgUploadInputEl.files[0];

      if (!validateFile(file)) {
        imgUploadInputEl.value = '';
        createResponseElement(false);
        return;
      }

      const fileUrl = URL.createObjectURL(file);

      imgUploadPreviewImageEl.src = fileUrl;
      setPreviewsImage(fileUrl);
    },
    destroyFile: () => {
      imgUploadPreviewImageEl.src = '';
      setPreviewsImage('');
    }
  };
};

export {setupFile};
