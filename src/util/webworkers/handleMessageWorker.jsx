import { idlFactory } from "../../declarations/message_notification/message_notification.did.js";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

let timer;

self.onmessage = async ({ data }) => {
  const { message, canisterId, host } = data;

  switch (msg) {
    case "start":
      start(canisterId, host);
      break;
    case "clearAllNotifications":
    clearAllNotifications(canisterId, host);
    break;
    case stop:
      stop();
  }
};

const stop = () => clearInterval(timer);

const start = (canisterId, host) =>
  (timer = setInterval(() => call(canisterId, host), 2000));

const call = async (canisterId, host) => {
  // Disable idle manager because web worker cannot access the window object / the UI
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });

  const isAuthenticated = await authClient.isAuthenticated();

  if (!isAuthenticated) {
    // User is not authenticated
    return;
  }

  const identity = authClient.getIdentity();

  await query(identity, canisterId, host);
};

// Copied from auto-generated ../../declarations/icwebworker_backend/icwebworker_backend.did.js
//
// We have to copy canisterId and createActor from the declaration because the default (last line of the script):
// export const icwebworker_backend = createActor(canisterId);
// breaks in a web worker context

export const createActor = (canisterId, options) => {
  const agent = new HttpAgent(options ? { ...options.agentOptions } : {});

  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...(options ? options.actorOptions : {}),
  });
};
//clear all notifications between user and another friend. 
//the user is already authenticated for them to see all their notifications
//so we can just all the getIdentity method on the client
async function clearAllNotifications(canisterId, host){
  const identity = authClient.getIdentity();
  const actor = createActor(canisterId, {
    agentOptions: { identity, host },
  });
  await actor.clearAllNotifications();
}
const query = async (identity, canisterId, host) => {
  const actor = createActor(canisterId, {
    agentOptions: { identity, host },
  });

    const myNotifications = await actor.getMyNotifications();
    postMessage({ msg: "messages_notifcations", notifications: myNotifications });
  

};
