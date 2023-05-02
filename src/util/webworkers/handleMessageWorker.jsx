// import { idlFactory } from "../../declarations/message_notification";
// import { Actor, HttpAgent } from "@dfinity/agent";
const {idlFactory} = require("../../declarations/message_notification")
const { Actor, HttpAgent } = require("@dfinity/agent");
// const x = require("@dfinity/agent");
// const idlFactory = require("../../declarations/message_notification");

self.onmessage = async function ({ data }) {
  const { msg, canisterId } = data;
  if (msg === "start") {
    const authenticatedMessageWorker = createActor(canisterId);
    setInterval(async () => {
      console.log(authenticatedMessageWorker);
      // const myNotifications =
      //   await authenticatedMessageWorker.getMyNotifications();
      // postMessage({
      //   msg: "messages_notifcations",
      //   notifications: myNotifications,
      // });
    }, 1000);
  }
};

// -----------------------------------------------------------

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

// module.exports = {}
// -----------------------------------------------------------

// let code = workercode.toString();
// code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

// const blob = new Blob([code], { type: "application/javascript" });
// const worker_script = URL.createObjectURL(blob);

// export default worker_script;
