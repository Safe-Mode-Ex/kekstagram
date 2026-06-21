import { createResponseElement } from '../../../core/template.js';
import { FILE_TYPES } from '../../../shared/const.js';

const setupFile = (imgUploadInputEl, imgUploadPreviewImageEl) => {
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

      imgUploadPreviewImageEl.src = URL.createObjectURL(file);
    },
    destroyFile: () => {
      imgUploadPreviewImageEl.src = '';
    }
  };
};

export {setupFile};
