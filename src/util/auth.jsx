import React from "react";
import { AuthClient } from "@dfinity/auth-client";
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
    // console.log(...authenticatedUser);
    // sessionStorage.setItem("test", JSON.stringify({ ...authenticatedUser }));
    // setSessionStorage("actor", authenticatedUser, false);
    setPrincipal(identity._principal.toText());
    // console.log(getFromSessionStorage("actor", true));
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
        //  O console.log(...authenticatedUser);
        // sessionStorage.setItem("test", JSN.stringify({ authenticatedUser }));
        // setSessionStorage("actor", JSON.stringify(authenticatedUser), true);
        setPrincipal(identity._principal.toText());
        // console.log(getFromSessionStorage("actor", true));
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
