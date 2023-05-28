import { conversation } from "../../../../authentication/conversation";
import { profile } from "../../../../declarations/profile";
import { getFileFromPostAssetCanister } from "../../../../authentication/post_assets";
import { createObjectURLFromArrayOfBytes } from "../../../../util/functions";

export async function getAllMyFriends() {
  const authenticatedUser = await conversation();
  const myFriends = await authenticatedUser.getAllMyFriends();
  if (myFriends?.err) {
    alert("sdfas");
    return;
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
