import { post } from "../../../authentication/post";
import {
  deletePostImagesFromPostAssetCanister,
  getFileFromPostAssetCanister,
} from "../../../authentication/post_assets";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../../util/functions";

export async function getAllMyPostings() {
  const postCanister = await post();
  const allPostings = await postCanister.getAllMyPostings();
  console.log(allPostings);
  if (allPostings?.err) {
    // alert(getErrorMessage(post.err));
    // setIsLoading(false);
    // return;
  }
  return allPostings.ok;
}

export async function getUserProfile() {
  const file = await getFileFromPostAssetCanister(
    getFromSessionStorage("profilePicture", true)
  );
  return createObjectURLFromArrayOfBytes(file._content);
}

export function filterMyPostings(myPostings, selectedPostId) {
  const newPostings = myPostings.filter((posting) => {
    const targetPost = posting[0].postId == selectedPostId;
    if (targetPost) {
      deletePostImagesFromPostAssetCanister(posting[0].images);
      return false;
    }
    return true;
  });
  return newPostings;
}

export async function deletePost(selectedPostId) {
  const postCanister = await post();
  await postCanister.deletePost(selectedPostId);
}
