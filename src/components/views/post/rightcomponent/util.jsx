import { Principal } from "@dfinity/principal";
import { push, ref, set } from "firebase/database";

import { createAuthenticatedActor } from "../../../../canisters/createActor";
import {
  canisterId as conversationCanisterId,
  createActor as conversationCreateActor,
} from "../../../../declarations/conversation";
import { getFromSessionStorage } from "../../../../util/functions";

export async function sendMessage(message, firebaseDB, post) {
  const chatMessage = createChatMessage(message, post);
  const actor = await createAuthenticatedActor(
    conversationCanisterId,
    conversationCreateActor
  );
  const result = await actor.sendMessage(chatMessage);
  //send message notification to the receiver
  const messageRef = ref(firebaseDB, post.CreatorOfPostId.toText());
  set(push(messageRef), chatMessage);
  return result;
}

function createChatMessage(userMessage, post) {
  return {
    messageContent: userMessage,
    sender: Principal.fromText(getFromSessionStorage("principalId", true)),
    receiver: post.CreatorOfPostId,
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
  };
}
