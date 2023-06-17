import { getFileFromPostAssetCanister, uploadFileToPostAssetCanister, removeFileFromPostAssetCanister } from "../../../canisters/post_assets";
import { profile as profileCanister } from "../../../canisters/profile";
import { getFromSessionStorage, getUniqueId, setSessionStorage } from "../../../util/functions";
import SnackbarCmp from "../../../util/reuseableComponents/SnackbarCmp";

  export async function updateUserProfile(profile){
    //removing the old profile picture
    // removeFileFromPostAssetCanister(profile.profilePicture);

    const profileImagePath = profile.principal + "/profile/" + getUniqueId();
    const key = await uploadFileToPostAssetCanister(
      profile.profilePicture,
      profileImagePath
    );
    const updatedProfile = {
      profilePicture: key,
      firstName : profile.firstName,
      lastName : profile.lastName,
      email : profile.email,
      location : profile.location
    };
    console.log(updatedProfile);
    const authenticatedProfileCanister = await profileCanister();
    const result = await authenticatedProfileCanister.updateUserProfile(
      updatedProfile
    );
    console.log(result);
    return result;
  }

  export async function getUserProfileFromSessionStorage(){
    return {
      profilePicture : await getUserProfilePicture(),
      firstName : getFromSessionStorage("firstName", false),
      lastName : getFromSessionStorage("lastName", false),
      email : getFromSessionStorage("email", true),
      principal : getFromSessionStorage("principalId", true),
      location : getFromSessionStorage("location", false)
    };
  }

  async function getUserProfilePicture(){
    const userProfile = getFromSessionStorage("profilePicture", true);
    const file = await getFileFromPostAssetCanister(userProfile);
    return file._content;
  }

  export function updateSessionStorage(profile){
    setSessionStorage("firstName", profile.firstName, false);
    setSessionStorage("lastName", profile.lastName, false);
    setSessionStorage("location", profile.location, false);
    setSessionStorage("email", profile.email, true);
    setSessionStorage("profilePicture", profile.profllePicture, true);
  }

export function updateSnackBarCmp(setShowSnackbarCmp) {
    setShowSnackbarCmp(
      <SnackbarCmp
        message="Your profile has been updated!"
        handleClose={(event, reason) => {
          //the user has to click on the alert to close it.
          if (reason != "clickaway") {
            setShowSnackbarCmp(null);
          }
        }}
      />
    );
  }