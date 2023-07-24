import { useState } from "react";

import { getErrorMessage } from "../../../../util/ErrorMessages";
import { updateSessionStorage } from "../../util";
import { convertImageFileToNat8, updateUserProfile } from "../util";

function useHandleSubmit() {
  //loadingProgress can have 3 values: notLoading, loading, completedLoading
  const [loadingProgress, setLoadingProgress] = useState("notLoading");

  const handleSubmit = async (profile) => {
    if (
      profile.location.length === 0 ||
      profile.firstName.length === 0 ||
      profile.lastName.length === 0 ||
      profile.email.length === 0
    ) {
      alert("Fill in all the required fields");
      return;
    }
    setLoadingProgress("loading");
    const updatedProfile = { ...profile };
    updatedProfile.profilePicture =
      updatedProfile.profilePicture instanceof Uint8Array
        ? updatedProfile.profilePicture
        : await convertImageFileToNat8(updatedProfile.profilePicture);

    const newProfile = await updateUserProfile(updatedProfile);

    if (newProfile?.err) {
      alert(getErrorMessage(newProfile.err));
    } else {
      updateSessionStorage({ ...newProfile.ok, principal: profile.principal });
      setLoadingProgress("completedLoading");
    }
  };

  return { handleSubmit, loadingProgress, setLoadingProgress };
}

export default useHandleSubmit;
