import { getAuthenticatedMessageNotificationWorker } from "../auth.jsx";
// import worker_script from "./handleMessageWorker.jsx";

export async function startMessageWorker() {
  const worker = new Worker("src/util/webworkers/handleMessageWorker.jsx");
  worker.onmessage = ({ data }) => {
    const { msg, notifications } = data;
    if (msg === "messages_notifcations") {
      console.log(notifications);
    }
  };
  worker.postMessage({
    msg: "start",
  });
}
