import { AuthClient } from "@dfinity/auth-client";

import {
  canisterId as conversationCanisterId,
  createActor as conversationCreateActor,
} from "../declarations/conversation";
import {
  canisterId as messageNotificationCanisterId,
  createActor as messageNotificationCreateActor,
} from "../declarations/message_notification";
import { canisterId, createActor } from "../declarations/post";
import {
  canisterId as postAssetCanisterId,
  createActor as postAssetCreateActor,
} from "../declarations/post_assets";
import {
  canisterId as profileCanisterId,
  createActor as profileCreateActor,
} from "../declarations/profile";
//Authenticate using internet identity and store the users principal
console.log(AuthClient);
export async function InternetIdentityAuthentication(setPrincipal) {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });
  if (await authClient.isAuthenticated()) {
    const identity = await authClient.getIdentity();
    setPrincipal(identity._principal.toText());
  } else {
    await authClient.login({
      identityProvider: process.env.INTERNET_IDENTITY_URL,
      onSuccess: async () => {
        const identity = await authClient.getIdentity();
        setPrincipal(identity._principal.toText());
      },
    });
  }
}

export async function getAuthenticatedPostUser() {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });
  const identity = await authClient.getIdentity();
  return createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });
}

export async function getAuthenticatedProfileUser() {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });
  const identity = await authClient.getIdentity();
  return profileCreateActor(profileCanisterId, {
    agentOptions: {
      identity,
    },
  });
}

export async function getAuthenticatedConversationUser() {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });
  const identity = await authClient.getIdentity();
  return conversationCreateActor(conversationCanisterId, {
    agentOptions: {
      identity,
    },
  });
}

export async function getAuthenticatedPostAssetUser() {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });
  const identity = await authClient.getIdentity();
  return postAssetCreateActor(postAssetCanisterId, {
    agentOptions: {
      identity,
    },
  });
}

export async function getAuthenticatedMessageNotificationWorker() {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });
  const identity = await authClient.getIdentity();
  return messageNotificationCreateActor(messageNotificationCanisterId, {
    agentOptions: {
      identity,
    },
  });
}


export async function logout(){
  sessionStorage.clear();
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });
  // const identity = await authClient.getIdentity();
  await authClient.logout();
}