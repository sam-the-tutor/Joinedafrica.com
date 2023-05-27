export default function reducer(state, action) {
    console.log(state);
    console.log(action);
  switch (action.type) {
    case "setCategoryName": {
      return {
        ...state,
        categoryName: action.value,
      };
    }
    case "setListOfSubcategories": {
      return {
        ...state,
        subCategories: action.value,
      };
    }
    case "setSelectedSubcategory": {
      return {
        ...state,
        selectedSubcategory: action.value,
      };
    }
  }
}
