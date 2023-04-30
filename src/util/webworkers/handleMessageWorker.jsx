import { idlFactory } from "../../declarations/message_notification";
import { getAuthenticatedMessageNotificationWorker } from "../auth";
import { Actor, HttpAgent } from "@dfinity/agent";

const workercode = () => {
  self.onmessage = async function ({ data }) {
    const { msg, canisterId } = data;
    console.log(msg);
    if (msg === "start") {
      // const canisterId = process.env.MESSAGE_NOTIFICATION_CANISTER_ID;
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

      const authenticatedMessageWorker = createActor(canisterId);
      // await getAuthenticatedMessageNotificationWorker();
      console.log("her");
      //pull from the message notifications canister every 1 second
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
};

// -----------------------------------------------------------

// -----------------------------------------------------------

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
