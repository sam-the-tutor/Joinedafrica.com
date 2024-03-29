import { AuthClient } from "@dfinity/auth-client";

export async function logout() {
  sessionStorage.clear();
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });
  await authClient.logout();
}
