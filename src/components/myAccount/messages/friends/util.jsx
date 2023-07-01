import { createAuthenticatedActor } from "../../../../canisters/createActor";
import { canisterId, createActor } from "../../../../declarations/assets";
import {
  canisterId as conversationCanisterId,
  createActor as conversationCreateActor,
} from "../../../../declarations/conversation";
import { profile } from "../../../../declarations/profile";
import { getErrorMessage } from "../../../../util/ErrorMessages";
import { createObjectURLFromArrayOfBytes } from "../../../../util/functions";

export async function getAllMyFriends() {
  const authenticatedUser = await createAuthenticatedActor(
    conversationCanisterId,
    conversationCreateActor
  );
  const myFriends = await authenticatedUser.getAllMyFriends();
  if (myFriends?.err) {
    alert(getErrorMessage(myFriends.err));
    return [];
  }
  const friendsList = [];
  const actor = await createAuthenticatedActor(canisterId, createActor);
  await Promise.all(
    myFriends.ok.map(async (userId) => {
      const friendProfile = await profile.getUserProfilePicture(userId);
      const imageFile = await actor.getAsset(friendProfile.ok.profilePicture);
      friendsList.push({
        ...friendProfile.ok,
        profileImageFile: createObjectURLFromArrayOfBytes(imageFile.ok),
      });
    })
  );
  return friendsList;
}
