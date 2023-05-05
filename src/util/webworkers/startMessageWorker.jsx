export async function startMessageWorker() {
  const worker = new Worker("src/util/webworkers/handleMessageWorker.jsx", {
    type: "module",
  });
  const canisterId = process.env.MESSAGE_NOTIFICATION_CANISTER_ID;
  worker.onmessage = ({ data }) => {
    const { msg, notifications } = data;
    if (msg === "messages_notifcations") {
      console.log(notifications);
    }
  };
  console.log(process.env.DFX_NETWORK);
  worker.postMessage({
    msg: "start",
    canisterId,
    host:
      process.env.DFX_NETWORK != "ic"
        ? `http://${canisterId}.localhost:3000/`
        : "https://icp-api.io",
  });
}
