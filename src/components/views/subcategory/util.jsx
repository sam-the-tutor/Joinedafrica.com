import { post } from "../../../declarations/post";
import { getErrorMessage } from "../../../util/ErrorMessages";

export async function getAllPostingsInSubcategory(
  categoryName,
  subcategoryName
) {
  const result = await post.getAllPostingsInSubcategory(
    categoryName,
    subcategoryName
  );
  if (result?.err) {
    alert(getErrorMessage(result.err));
    return [];
  } else {
    return result.ok;
  }
}
