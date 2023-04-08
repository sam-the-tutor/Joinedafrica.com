import React from "react";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "../declarations/joinedafrica";


//Authenticate using internet identity and store the users principal
export async function InternetIdentityAuthentication(setPrincipal) {
  console.log(process.env.INTERNET_IDENTITY_URL);
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
