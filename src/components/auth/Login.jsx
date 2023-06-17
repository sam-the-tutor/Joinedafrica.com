import { AuthClient } from "@dfinity/auth-client";

export async function internet_identity(setPrincipal) {
  const authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });

  if (await authClient.isAuthenticated()) {
    const identity = authClient.getIdentity();
    setPrincipal(identity.getPrincipal().toText());
  } else {
    authClient.login({
      windowOpenerFeatures:
        "toolbar=0,location=0,menubar=0,width=500,height=500,left=100,top=100",
      identityProvider: process.env.INTERNET_IDENTITY_URL,
      onSuccess: () => {
        const identity = authClient.getIdentity();
        setPrincipal(identity.getPrincipal().toText());
      },
    });
  }
}
