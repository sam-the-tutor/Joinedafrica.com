import React from "react";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "../declarations/joinedafrica";
import {
  canisterId as conversationCanisterId,
  createActor as conversationCreateActor,
} from "../declarations/conversation";
import {
  canisterId as profileCanisterId,
  createActor as profileCreateActor,
} from "../declarations/profile";
//Authenticate using internet identity and store the users principal
export async function InternetIdentityAuthentication(setPrincipal) {
  const authClient = await AuthClient.create();
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

export async function getAuthenticatedUser() {
  const authClient = await AuthClient.create();
  const identity = await authClient.getIdentity();
  return createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });
}

export async function getAuthenticatedProfileUser() {
  const authClient = await AuthClient.create();
  const identity = await authClient.getIdentity();
  return profileCreateActor(profileCanisterId, {
    agentOptions: {
      identity,
    },
  });
}

export async function getAuthenticatedConversationUser() {
  const authClient = await AuthClient.create();
  const identity = await authClient.getIdentity();
  return conversationCreateActor(conversationCanisterId, {
    agentOptions: {
      identity,
    },
  });
}
