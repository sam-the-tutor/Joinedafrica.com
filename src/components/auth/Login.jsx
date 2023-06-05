import { AuthClient } from "@dfinity/auth-client";
export async function internet_identity() {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });

  if (await authClient.isAuthenticated()) {
    const identity = await authClient.getIdentity();
    return identity.getPrincipal().toText();
    
  } else {
    await authClient.login({
      identityProvider: process.env.INTERNET_IDENTITY_URL,
      onSuccess: async () => {
        const identity = await authClient.getIdentity();
        return identity.getPrincipal().toText();
      },
    });
  }
}
