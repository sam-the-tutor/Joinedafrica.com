import React from "react";
import { AuthClient } from "@dfinity/auth-client";
import { setSessionStorage } from "./functions";
import { canisterId, createActor } from "../declarations/joinedafrica";

//Authenticate using internet identity and store the users principal
export async function InternetIdentityAuthentication(setPrincipal) {
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    const identity = await authClient.getIdentity();
    const authenticatedUser = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    console.log(authenticatedUser);
    setSessionStorage(actor, authenticatedUser, true);
    setPrincipal(identity._principal.toText());
  } else {
    await authClient.login({
      identityProvider: process.env.INTERNET_IDENTITY_URL,
      onSuccess: async () => {
        const identity = await authClient.getIdentity();
        const authenticatedUser = createActor(canisterId, {
          agentOptions: {
            identity,
          },
        });
        console.log(authenticatedUser);
        setSessionStorage(actor, authenticatedUser, true);
        setPrincipal(identity._principal.toText());
      },
    });
  }
}
