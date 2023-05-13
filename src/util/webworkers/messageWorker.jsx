import { useContext } from "react";
import { AppContext } from "../../context";

export async function messageWorker(
  newMessageNotification,
  setNewMessageNotification,
  message
) {
  // const {} = useContext(AppContext)
  // console.log(newMessageNotification);
  const worker = new Worker("src/util/webworkers/handleMessageWorker.jsx", {
    type: "module",
  });
  const canisterId = process.env.MESSAGE_NOTIFICATION_CANISTER_ID;
  // debugger;
  worker.onmessage = ({ data }) => {
    const { msg, notifications } = data;

    if (msg === "messages_notifcations" && notifications.length > 0) {
      // console.log(notifications);
      setNewMessageNotification(notifications);
    }
    console.log("her");
    // worker.terminate();
    // return;
    // continue polling
    worker.postMessage({
      message,
      canisterId,
      host:
        process.env.DFX_NETWORK != "ic"
          ? `http://${canisterId}.localhost:3000/`
          : "https://icp-api.io",
    });
  };
  worker.postMessage({
    message,
    canisterId,
    host:
      process.env.DFX_NETWORK != "ic"
        ? `http://${canisterId}.localhost:3000/`
        : "https://icp-api.io",
  });
}