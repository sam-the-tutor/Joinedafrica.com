import { Principal } from "@dfinity/principal";
import { ref, remove, set, push } from "firebase/database";

import { conversation as conversationCanister } from "../../../../canisters/conversation";
import { getFromSessionStorage } from "../../../../util/functions";

const startPrincipalIndex = 0;
const endPrincipalIndex = 63;

//load my messages from the conversation canister
export async function getMyMessages(friendProfilePicture) {
  const myFriendPrincipal = friendProfilePicture.substring(
    startPrincipalIndex,
    endPrincipalIndex
  );
  const authenticatedUser = await conversationCanister();
  const messages = await authenticatedUser.getMyMessages(myFriendPrincipal);
  return sort(messages.ok);
}

//sorting the messages by date and time in ascending order
export function sort(newMessages) {
  return newMessages.sort((child, parent) => {
    if (child.date === parent.date) {
      return child.time.localeCompare(parent.time);
    } else {
      return child.date.localeCompare(parent.date);
    }
  });
}

//returns an array contains [newMessagesFromSelectedFriend, newMessagesFromOtherFriends]
export function loadNewMessages(isFriendSelected, newMessageNotifications) {
  const myFriendPrincipal = isFriendSelected.profilePicture.substring(
    startPrincipalIndex,
    endPrincipalIndex
  );
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
  return [newMessagesFromSelectedFriend, newMessagesFromOtherFriends];
}

//remove seen messages from firebase
export function removeSeenMessageNotifications(
  newMessagesFromSelectedFriend,
  firebaseDB
) {
  const myPrincipal = getFromSessionStorage("principalId", true);
  newMessagesFromSelectedFriend.forEach((message) => {
    remove(ref(firebaseDB, `${myPrincipal}/${message.id}`));
  });
}

export async function sendMessage({
  myMessages,
  setMyMessages,
  conversation,
  setConversation,
  isFriendSelected,
  firebaseDB,
}) {
  const myFriendPrincipal = isFriendSelected.profilePicture.substring(
    startPrincipalIndex,
    endPrincipalIndex
  );
  const chatMessage = createChatMessage(myFriendPrincipal, conversation);
  setMyMessages([...myMessages, chatMessage]);
  setConversation("");

  await sendChatMessageToBackend(chatMessage);
  sendChatMessageToFirebase(chatMessage, firebaseDB);
}

function createChatMessage(myFriendPrincipal, conversation) {
  return {
    messageContent: conversation,
    sender: Principal.fromText(getFromSessionStorage("principalId", true)),
    receiver: Principal.fromText(myFriendPrincipal),
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
  };
}

async function sendChatMessageToBackend(chatMessage) {
  const authenticatedUser = await conversationCanister();
  await authenticatedUser.sendMessage(chatMessage);
}

function sendChatMessageToFirebase(chatMessage, firebaseDB) {
  const myFriendPrincipal = chatMessage.receiver.toText();
  const messageRef = ref(firebaseDB, myFriendPrincipal);
  set(push(messageRef), chatMessage);
}
