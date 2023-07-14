import { createAuthenticatedActor } from "../../canisters/createActor";
import { canisterId, createActor } from "../../declarations/post";
import { getErrorMessage } from "../../util/ErrorMessages";

export async function publishPost(post) {
  const actor = await createAuthenticatedActor(canisterId, createActor);
  console.log(post);
  post.IsPublished = true;
  console.log(post);
  const [publishedResult, removedResult] = await Promise.all([
    actor.publishPost(post),
    actor.removePostFromReview(post),
  ]);
  if (publishedResult?.err) {
    alert(getErrorMessage(publishedResult.err));
  }
  if (removedResult?.err) {
    alert(getErrorMessage(removedResult.err));
  } else alert("Post has been published to marketplace");
}
export async function rejectPost(post) {
  const actor = await createAuthenticatedActor(canisterId, createActor);
  const removedResult = await actor.removePostFromReview(post);
  if (removedResult?.err) {
    alert(getErrorMessage(removedResult.err));
  } else alert("Post has been removed from review");
}
