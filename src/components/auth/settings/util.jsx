import { createAuthenticatedActor } from "../../../canisters/createActor";
import { canisterId, createActor } from "../../../declarations/assets";
import {
  canisterId as profileCanisterId,
  createActor as profileCreateActor,
} from "../../../declarations/profile";
import { getFromSessionStorage, getUniqueId } from "../../../util/functions";
import SnackbarCmp from "../../../util/reuseableComponents/SnackbarCmp";

async function updateProfilePicture(profile, profileImagePath) {
  const assetId = getFromSessionStorage("profilePicture", true);
  const actor = await createAuthenticatedActor(canisterId, createActor);
  const [assetResult, uploadedAssetResult] = await Promise.all([
    actor.deleteAsset(assetId),
    actor.uploadAsset(profile.profilePicture, profileImagePath),
  ]);
  if (assetResult?.err) return assetResult;
  return uploadedAssetResult;
}

export async function updateUserProfile(profile) {
  const profileImagePath = profile.principal + "/profile/" + getUniqueId();
  const updatedProfilePictureResult = await updateProfilePicture(
    profile,
    profileImagePath
  );
  if (updatedProfilePictureResult?.err) return updatedProfilePictureResult;

  const updatedProfile = {
    profilePicture: profileImagePath,
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    location: profile.location,
  };
  const profileActor = await createAuthenticatedActor(
    profileCanisterId,
    profileCreateActor
  );
  const profileResult = await profileActor.updateUserProfile(updatedProfile);
  return profileResult;
}

export async function getUserProfileFromSessionStorage() {
  const profilePicture = await getUserProfilePicture();
  if (profilePicture?.err) return profilePicture;
  return {
    profilePicture: profilePicture.ok,
    firstName: getFromSessionStorage("firstName", false),
    lastName: getFromSessionStorage("lastName", false),
    email: getFromSessionStorage("email", true),
    principal: getFromSessionStorage("principalId", true),
    location: getFromSessionStorage("location", false),
  };
}
export async function convertImageFileToNat8(file) {
  const imageArray = await file.arrayBuffer();
  return [...new Uint8Array(imageArray)];
}
async function getUserProfilePicture() {
  const assetId = getFromSessionStorage("profilePicture", true);
  const actor = await createAuthenticatedActor(canisterId, createActor);
  const imageFile = await actor.getAsset(assetId);
  return imageFile;
}

export function updateSnackBarCmp(setShowSnackbarCmp) {
  setShowSnackbarCmp(
    <SnackbarCmp
      message="Your profile has been updated!"
      handleClose={(event, reason) => {
        //the user has to click on the alert to close it.
        if (reason != "clickaway") {
          setShowSnackbarCmp(null);
        }
      }}
    />
  );
}
