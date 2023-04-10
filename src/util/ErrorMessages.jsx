//disply error message based on the error type

export function getErrorMessage(error) {
  if (error.UnAuthorizedUser) {
    return "Please log in or create an account";
  }
  if (error.UserNotFound) {
    return "User not found";
  }
  if (error.UserAlreadyExists) {
    return "User already exists";
  }
  if (error.PostNotFound) {
    return "Post not found";
  }
  if (error.CategoryNotFound) {
    return "Category not found";
  }
  if (error.SubcategoryNotFound) {
    return "Subcategory not found";
  }
}
