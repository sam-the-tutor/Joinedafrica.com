import React, { useState } from "react";
import { profile } from "../../../canisters/profile";
import { setSessionStorage } from "../../../util/functions";
import { getErrorMessage } from "../../../util/ErrorMessages";

export async function setUserProfileDetails(principal) {
  const authenticatedProfileUser = await profile();
  let result = await authenticatedProfileUser.getUserProfile();
  console.log(result);
  if (result?.err) {
    alert(getErrorMessage(result.err));
  } else {
    const profile = { ...result.ok };
    //encrypt the users email, principalId and profilePicture only as they are confidential.
    setSessionStorage("firstName", profile.firstName, false);
    setSessionStorage("lastName", profile.lastName, false);
    setSessionStorage("email", profile.email, true);
    setSessionStorage("principalId", principal, true);
    setSessionStorage("profilePicture", profile.profilePicture, true);
    setSessionStorage("isLoggedIn", "true", false);
  }
}
