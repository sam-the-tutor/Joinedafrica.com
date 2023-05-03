import { idlFactory } from "../../declarations/message_notification";
import { Actor, HttpAgent } from "@dfinity/agent";

self.onmessage = async function ({ data }) {
  const { msg } = data;
  if (msg === "start") {
    const authenticatedMessageWorker = createActor(canisterId);
    setInterval(async () => {
      const myNotifications =
        await authenticatedMessageWorker.getMyNotifications();
      postMessage({
        msg: "messages_notifcations",
        notifications: myNotifications,
      });
    }, 1000);
  }
};

// -----------------------------------------------------------
const canisterId = process.env.MESSAGE_NOTIFICATION_CANISTER_ID;
const createActor = (canisterId, options = {}) => {
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
