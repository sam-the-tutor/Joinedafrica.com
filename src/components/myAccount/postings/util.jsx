import { createAuthenticatedActor } from "../../../canisters/createActor";
import {
  canisterId as postCanisterId,
  createActor as postCreateActor,
} from "../../../declarations/post";
import {
  canisterId as assetCanisterId,
  createActor as assetCreateActor,
} from "../../../declarations/assets";

export async function getAllMyPostings() {
  const actor = await createAuthenticatedActor(postCanisterId, postCreateActor);
  const allPostings = await actor.getAllMyPostings();
  return allPostings;
}

export async function filterMyPostings(myPostings, selectedPostId) {
  const actor = await createAuthenticatedActor(
    assetCanisterId,
    assetCreateActor
  );
  const result = [];
  await Promise.all(
    myPostings.map(async (posting) => {
      const post = posting[0];
      if (post.PostId === selectedPostId) {
        // await deleteAssets(actor, post.Images);
        console.log(selectedPostId);
      } else {
        result.push(posting);
      }
    })
  );
  // console.log(filteredPostings);
  // const result = myPostings.filter((_, index) => filteredPostings[index]);

  return result;
  // console.log(result);
}
export async function deleteAssets(actor, images) {
  await Promise.all(
    images.map(async (image) => {
      await actor.deleteAsset(image);
    })
  );
}

export async function deletePost(selectedPostId) {
  const actor = await createAuthenticatedActor(postCanisterId, postCreateActor);
  await actor.deletePost(selectedPostId);
}
