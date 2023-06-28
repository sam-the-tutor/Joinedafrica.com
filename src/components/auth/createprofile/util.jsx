import { createAuthenticatedActor } from "../../../canisters/createActor";
import { uploadFileToPostAssetCanister } from "../../../canisters/post_assets";
import { profile } from "../../../canisters/profile";
import { getUniqueId } from "../../../util/functions";
import {
  canisterId as assetCanisterId,
  createActor as assetCreateActor,
} from "../../../declarations/assets";
import {
  canisterId as profileCanisterId,
  createActor as profileCreateActor,
} from "../../../declarations/profile";
// export async function createUserProfile(userProfile) {
//   const profileImagePath = userProfile.principal + "/profile/" + getUniqueId();
//   const key = await uploadFileToPostAssetCanister(
//     userProfile.profilePicture,
//     profileImagePath
//   );
//   userProfile.profilePicture = key;
//   const authenticatedProfileUser = await profile();
//   const result = await authenticatedProfileUser.createUserProfile(userProfile);
//   return result;
// }
/**
 *
 * @param {*} userProfile The user profile to create.
 * @returns returns the result of trying to create the user profile. The result could be #ok or #err. The result is #err if
 * there is an error in uploading the profile picture to the asset canister or creating the users profile. Otherwise #ok
 * will be returned.
 */
export async function createUserProfile(userProfile) {
  const assetId = userProfile.principal + "/profile/" + getUniqueId();
  const assetResult = await uploadAsset(assetId, userProfile.profilePicture);
  console.log(assetResult);
  if (assetResult?.err) return assetResult;
  const authenticatedActor = await createAuthenticatedActor(
    profileCanisterId,
    profileCreateActor
  );
  userProfile.profilePicture = assetId;
  const result = await authenticatedActor.createUserProfile(userProfile);
  console.log(result);
  return result;
}
async function uploadAsset(assetId, profilePicture) {
  const [authenticatedActor, asset] = await Promise.all([
    createAuthenticatedActor(assetCanisterId, assetCreateActor),
    convertImageFileToNat8(profilePicture),
  ]);
  console.log(asset);
  console.log(authenticatedActor);
  const result = await authenticatedActor.uploadAsset(asset, assetId);
  return result;
}

async function convertImageFileToNat8(file) {
  const imageArray = await file.arrayBuffer();
  return [...new Uint8Array(imageArray)];
}
