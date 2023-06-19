import { setSessionStorage } from "../../util/functions";

export function updateSessionStorage(userProfile) {
  // encrypt the users email and principalId and profilePicture only as they are confidential.
  setSessionStorage("firstName", userProfile.firstName, false);
  setSessionStorage("lastName", userProfile.lastName, false);
  setSessionStorage("isLoggedIn", "true", false);
  setSessionStorage("location", userProfile.location, false);
  setSessionStorage("email", userProfile.email, true);
  setSessionStorage("principalId", userProfile.principal, true);
  setSessionStorage("profilePicture", userProfile.profilePicture, true);
}
