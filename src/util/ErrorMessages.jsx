//disply error message based on the error type

export function getErrorMessage(error) {
  switch (Object.keys(error)[0]) {
    case "UnAuthorizedUser": {
      return "User is unAuthorized";
    }
    case "UserNotFound": {
      return "User not found";
    }
    case "UserAlreadyExists": {
      return "User already exists";
    }
    case "PostNotFound": {
      return "Post not found";
    }
    case "CategoryNotFound": {
      return "Category not found";
    }
    case "SubcategoryNotFound": {
      return "Subcategory not found";
    }
    case "DuplicateAssetId": {
      return "Error occured while uploading your image. Please try again";
    }
    case "AssetNotFound": {
      return "Asset not found";
    }
    case "PostIsAlreadyInReview": {
      return "Post is Already In Review";
    }
  }
}
