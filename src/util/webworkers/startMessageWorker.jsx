import { idlFactory } from "../../declarations/message_notification/index.js";
import { getAuthenticatedMessageNotificationWorker } from "../auth.jsx";
import worker_script from "./handleMessageWorker.jsx";
import { Actor, HttpAgent } from "@dfinity/agent";

getAuthenticatedMessageNotificationWorker;
export async function startMessageWorker() {
  const worker = new Worker(worker_script);
  worker.onmessage = ({ data }) => {
    const { msg, notifications } = data;
    if (msg === "messages_notifcations") {
      console.log(notifications);
    }
  };
  console.log("here2");
  worker.postMessage({
    msg: "start",
    canisterId: process.env.MESSAGE_NOTIFICATION_CANISTER_ID,
  });
}

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
