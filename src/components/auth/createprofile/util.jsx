import { createAuthenticatedActor } from "../../../canisters/createActor";
import {
  canisterId as assetCanisterId,
  createActor as assetCreateActor,
} from "../../../declarations/assets";
import { getUniqueId } from "../../../util/functions";
import {
  canisterId as profileCanisterId,
  createActor as profileCreateActor,
} from "../../../declarations/profile";

/**
 *
 * @param {*} userProfile The user profile to create.
 * @returns returns the result of trying to create the user profile. The result could be #ok or #err. The result is #err if
 * there is an error in creating the users profile or uploading the profile picture to the asset canister. Otherwise #ok
 * will be returned.
 */
export async function createUserProfile(userProfile) {
  const assetId = userProfile.principal + "/profile/" + getUniqueId();
  const profilePicture = userProfile.profilePicture;
  const authenticatedActor = await createAuthenticatedActor(
    profileCanisterId,
    profileCreateActor
  );
  //storing the profile picture key
  userProfile.profilePicture = assetId;
  const profileResult = await authenticatedActor.createUserProfile(userProfile);
  if (profileResult?.err) return profileResult;
  const assetResult = await uploadAsset(assetId, profilePicture);
  if (assetResult?.err) return assetResult;
  return profileResult;
}
async function uploadAsset(assetId, profilePicture) {
  const [authenticatedActor, asset] = await Promise.all([
    createAuthenticatedActor(assetCanisterId, assetCreateActor),
    convertImageFileToNat8(profilePicture),
  ]);
  const result = await authenticatedActor.uploadAsset(asset, assetId);
  return result;
}

async function convertImageFileToNat8(file) {
  const imageArray = await file.arrayBuffer();
  return [...new Uint8Array(imageArray)];
}
