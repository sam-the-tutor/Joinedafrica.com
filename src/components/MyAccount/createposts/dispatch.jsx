import { getSubcategory } from "./listOfCategories";
import { useReducer } from "react";
import reducer from "./reducer";
import { state as initialState } from "./state";

export function setCategoryName(value) {
  dispatch({ type: "setCategoryName", value });
  setListOfSubcategories(getSubcategory(value));
}
function setListOfSubcategories(value) {
  dispatch({ type: "setListOfSubcategories", value });
}
export function setSelectedSubcategory(value) {
  dispatch({ type: "setSelectedSubcategory", value });
}
