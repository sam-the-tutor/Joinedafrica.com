import { Principal } from "@dfinity/principal";
import { ref, remove } from "firebase/database";

import { conversation } from "../../../../canisters/conversation";
import { getFromSessionStorage } from "../../../../util/functions";

//load my messages from the conversation canister
export async function getMyMessages(friendProfilePicture) {
  const friendsPrincipal = friendProfilePicture.substring(0, 63);
  const authenticatedUser = await conversation();
  const messages = await authenticatedUser.getMyMessages(friendsPrincipal);
  return [...sort(messages.ok).reverse()];
}

//sorting the messages by date and time
function sort(newMessages) {
  return newMessages.sort((child, parent) => {
    if (child.date === parent.date) {
      return parent.time < child.time;
    } else {
      //
      return parent.date < child.date;
    }
  });
}
// loads new messages from firebase and removes messages that are already seen from firebase
export function loadNewMessagesFromFirebase(
  isFriendSelected,
  newMessageNotifications,
  firebaseDB
) {
  const myFriendPrincipal = isFriendSelected.profilePicture.substring(0, 63);
  const newMessagesFromSelectedFriend = [];
  const newMessagesFromOtherFriends = [];
  newMessageNotifications.forEach((message) => {
    const sendersPrincipal = Principal.from(message.sender).toText();
    if (sendersPrincipal === myFriendPrincipal) {
      newMessagesFromSelectedFriend.push(message);
    } else {
      newMessagesFromOtherFriends.push(message);
    }
  });
  removeSeenMessageNotifications(newMessagesFromSelectedFriend, firebaseDB);
  return newMessagesFromSelectedFriend;
}

//remove seen messages from firebase
function removeSeenMessageNotifications(
  newMessagesFromSelectedFriend,
  firebaseDB
) {
  const myPrincipal = getFromSessionStorage("principalId", true);
  newMessagesFromSelectedFriend.forEach((message) => {
    remove(ref(firebaseDB, `${myPrincipal}/${message.id}`));
  });
}
