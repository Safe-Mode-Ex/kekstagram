import { FILE_TYPES } from '../const';

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
