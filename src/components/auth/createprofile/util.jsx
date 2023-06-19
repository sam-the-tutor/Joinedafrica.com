import { uploadFileToPostAssetCanister } from "../../../canisters/post_assets";
import { profile } from "../../../canisters/profile";
import { getUniqueId } from "../../../util/functions";

export async function createUserProfile(userProfile) {
  const profileImagePath = userProfile.principal + "/profile/" + getUniqueId();
  const key = await uploadFileToPostAssetCanister(
    userProfile.profilePicture,
    profileImagePath
  );
  userProfile.profilePicture = key;
  const authenticatedProfileUser = await profile();
  const result = await authenticatedProfileUser.createUserProfile(userProfile);
  return result;
}
