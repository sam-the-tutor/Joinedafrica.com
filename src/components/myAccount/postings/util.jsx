import { post } from "../../../canisters/post";
import {
  deletePostImagesFromPostAssetCanister,
  getFileFromPostAssetCanister,
} from "../../../canisters/post_assets";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../../util/functions";

export async function getAllMyPostings() {
  const postCanister = await post();
  const allPostings = await postCanister.getAllMyPostings();
  return allPostings;
}

export async function getUserProfile() {
  const file = await getFileFromPostAssetCanister(
    getFromSessionStorage("profilePicture", true)
  );
  return createObjectURLFromArrayOfBytes(file._content);
}

export function filterMyPostings(myPostings, selectedPostId) {
  const result = [];
  for (var i = 0; i < myPostings.length; i++) {
    const post = myPostings[i][0];
    if (post.postId == selectedPostId) {
      deletePostImagesFromPostAssetCanister(post.images);
    } else result.push(myPostings[i]);
  }
  return result;
}

export async function deletePost(selectedPostId) {
  const postCanister = await post();
  await postCanister.deletePost(selectedPostId);
}
