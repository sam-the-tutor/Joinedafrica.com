const MAXIMUM_NUMBER_OF_IMAGES = 3;
export default function reducer(state, action) {
  switch (action.type) {
    case "selectedImages": {
      if (state.selectedImages.length == MAXIMUM_NUMBER_OF_IMAGES) {
        alert(
          "The maximum number of images to add is " + MAXIMUM_NUMBER_OF_IMAGES
        );
        return state;
      }
      return {
        ...state,
        selectedImages: [...state.selectedImages, action.value],
      };
    }
    case "removeImage": {
      const result = state.selectedImages.filter(
        (_, index) => action.value != index
      );
      return {
        ...state,
        selectedImages: result,
      };
    }
    default: {
      return {
        ...state,
        ...action.value,
      };
    }
  }
}
