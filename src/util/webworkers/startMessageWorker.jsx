import { useContext } from "react";
import { AppContext } from "../../context";

export async function startMessageWorker(
  newMessageNotification,
  setNewMessageNotification
) {
  // const {} = useContext(AppContext)
  // console.log(newMessageNotification);
  const worker = new Worker("src/util/webworkers/handleMessageWorker.jsx", {
    type: "module",
  });
  const canisterId = process.env.MESSAGE_NOTIFICATION_CANISTER_ID;
  worker.onmessage = ({ data }) => {
    const { msg, notifications } = data;
    if (msg === "messages_notifcations") {
      setNewMessageNotification(notifications);
    }
  };
  worker.postMessage({
    msg: "start",
    canisterId,
    host:
      process.env.DFX_NETWORK != "ic"
        ? `http://${canisterId}.localhost:3000/`
        : "https://icp-api.io",
  });
}
