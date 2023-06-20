import { conversation } from "../../../../canisters/conversation";
import { getFileFromPostAssetCanister } from "../../../../canisters/post_assets";
import { profile } from "../../../../declarations/profile";
import { getErrorMessage } from "../../../../util/ErrorMessages";
import { createObjectURLFromArrayOfBytes } from "../../../../util/functions";

export async function getAllMyFriends() {
  const authenticatedUser = await conversation();
  const myFriends = await authenticatedUser.getAllMyFriends();
  if (myFriends?.err) {
    alert(getErrorMessage(myFriends.err));
    return [];
  }
  const friendsList = [];
  await Promise.all(
    myFriends.ok.map(async (userId) => {
      const friendProfile = await profile.getUserProfilePicture(userId);
      const iamgeFile = await getFileFromPostAssetCanister(
        friendProfile.ok.profilePicture
      );
      friendsList.push({
        ...friendProfile.ok,
        profileImageFile: createObjectURLFromArrayOfBytes(iamgeFile._content),
      });
    })
  );
  return friendsList;
}
