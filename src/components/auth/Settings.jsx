import SendIcon from "@mui/icons-material/Send";
import { Box, Button, TextField, Typography } from "@mui/material";
import { enc } from "crypto-js";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../context";
import { Image, ImageContainer } from "../../styling/auth/CreateProfile";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../util/functions";
import { getFileFromPostAssetCanister } from "../../util/postAssetCanisterFunctions";

export default function Settings() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const profileImagePath = principal + "/profile/" + getUniqueId();

    const key = await uploadFileToPostAssetCanister(
      userProfile.profilePicture,
      profileImagePath
    );
    createdProfile.profilePicture = key;
    // createdProfile.principalId = principal;

    const authenticatedProfileUser = await getAuthenticatedProfileUser();
    let result = await authenticatedProfileUser.createUserProfile(
      createdProfile
    );
    console.log(result);
    if (result?.err) {
      //handle the error
      alert(getErrorMessage(result.err));
    } else {
      //encrypt the users email and principalId and profilePicture only as they are confidential.
      setSessionStorage("firstName", userProfile.firstName, false);
      setSessionStorage("lastName", userProfile.lastName, false);
      setSessionStorage("email", userProfile.email, true);
      setSessionStorage("principalId", principal, true);
      setSessionStorage("profilePicture", key, true);
      setSessionStorage("isLoggedIn", "true", false);
      //start pull message notification from the notification canister
      messageWorker(
        newMessageNotification,
        setNewMessageNotification,
        "getAllNotifications"
      );
      navigate("/home");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    async function loadUserProfileFromSessionStorage() {
      setIsLoading(true);
      setFirstName(getFromSessionStorage("principalId", true));
      setFirstName(getFromSessionStorage("firstName", false));
      setLastName(getFromSessionStorage("lastName", false));
      setEmail(getFromSessionStorage("email", true));
      const userProfile = getFromSessionStorage("profilePicture", true);
      const file = await getFileFromPostAssetCanister(
        userProfile.toString(enc.Utf8)
      );
      setProfilePicture(file._content);
      setIsLoading(false);
    }
    loadUserProfileFromSessionStorage();
  }, []);

  return (
    <>
      <Box>
        {
          isLoading ? (
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
          )
          // {/* {isLoading && LoadingCmp(isLoading)} */}
        }
      </Box>
    </>
  );
}
