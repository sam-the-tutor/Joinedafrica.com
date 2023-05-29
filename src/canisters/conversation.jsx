import { canisterId, createActor } from "../declarations/conversation";
import { AuthClient } from "@dfinity/auth-client";

export async function conversation() {
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
