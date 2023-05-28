import { canisterId, createActor } from "../declarations/post";
import { AuthClient } from "@dfinity/auth-client";
export async function post() {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });
  const identity = await authClient.getIdentity();
  return createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });
}
