import { canisterId, createActor } from "../declarations/profile";
import { AuthClient } from "@dfinity/auth-client";
export async function profile() {
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
