import SendIcon from "@mui/icons-material/Send";
import { Box, Button, TextField, Typography } from "@mui/material";
import { enc } from "crypto-js";
import React, { useEffect, useState } from "react";

import { Image, ImageContainer } from "../../styling/auth/CreateProfile";
import { getAuthenticatedProfileUser } from "../../util/auth";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
  getUniqueId,
  setSessionStorage,
} from "../../util/functions";
import {
  getFileFromPostAssetCanister,
  removeFileFromPostAssetCanister,
  uploadFileToPostAssetCanister,
} from "../../util/postAssetCanisterFunctions";
import { LoadingCmp } from "../../util/reuseableComponents/LoadingCmp";

export default function Settings({ setRefreshComponent }) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [principal, setPrincipal] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [saveProfile, setSaveProfile] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (firstName.length == 0 || lastName.length == 0 || email.length == 0) {
      alert("All your credentials needs to be set");
      return;
    }
    setSaveProfile(true);

    //removing the current profile picture form the post asset canister
    // const userProfilePath = getFromSessionStorage("profilePicture", true);
    // await removeFileFromPostAssetCanister(userProfilePath);

    const profileImagePath = principal + "/profile/" + getUniqueId();
    const key = await uploadFileToPostAssetCanister(
      profilePicture,
      profileImagePath
    );
    const updatedProfile = {
      profilePicture: key,
      firstName,
      lastName,
      email,
    };
    const authenticatedProfileUser = await getAuthenticatedProfileUser();
    let result = await authenticatedProfileUser.updateUserProfile(
      updatedProfile
    );
    if (result?.err) {
      //handle the error
      alert(getErrorMessage(result.err));
    } else {
      //encrypt the users email and principalId and profilePicture only as they are confidential.
      // setSessionStorage("firstName", firstName, false);
      // setSessionStorage("lastName", lastName, false);
      // setSessionStorage("email", email, true);
      // setSessionStorage("profilePicture", key, true);
      // setRefreshComponent();
    }
    setSaveProfile(false);
  }

  useEffect(() => {
    async function loadUserProfileFromSessionStorage() {
      setIsLoading(true);
      setPrincipal(getFromSessionStorage("principalId", true));
      setFirstName(getFromSessionStorage("firstName", false));
      setLastName(getFromSessionStorage("lastName", false));
      setEmail(getFromSessionStorage("email", true));
      const userProfile = getFromSessionStorage("profilePicture", true);
      const file = await getFileFromPostAssetCanister(userProfile);
      setProfilePicture(file._content);
      // setProfilePicture(file._content\\);
      setIsLoading(false);
    }
    loadUserProfileFromSessionStorage();
  }, []);

  return (
    <>
      <Box>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Edit profile
            </Typography>
            <Box>
              <ImageContainer>
                <Image
                  src={createObjectURLFromArrayOfBytes(profilePicture)}
                  alt="User selected profile"
                />
              </ImageContainer>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
              <Typography>Choose profile image</Typography>
            </Box>
            <TextField
              fullWidth
              label="Enter your first name"
              variant="outlined"
              style={{ marginTop: "30px" }}
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Enter your last name"
              variant="outlined"
              style={{ margin: "30px 0" }}
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Enter your email address"
              fullWidth
              type="email"
              variant="outlined"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box style={{ marginTop: "40px" }}>
              <Button variant="outlined" endIcon={<SendIcon />} type="submit">
                Save Changes
              </Button>
            </Box>
          </Box>
        )}
        {LoadingCmp(saveProfile)}
      </Box>
    </>
  );
}
