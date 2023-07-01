import SendIcon from "@mui/icons-material/Send";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../../../context";
import { getErrorMessage } from "../../../util/ErrorMessages";
import { createObjectURLFromArrayOfBytes } from "../../../util/functions";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import { updateSessionStorage } from "../util";
import { Image, ImageContainer } from "./style";
import {
  convertImageFileToNat8,
  getUserProfileFromSessionStorage,
  updateSnackBarCmp,
  updateUserProfile,
} from "./util";

export default function Settings() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [principal, setPrincipal] = useState("");
  const [location, setLocation] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [savingUserProfile, setSavingUserProfile] = useState(false);
  const [showSnackbarCmp, setShowSnackbarCmp] = useState(null);

  const { reloadProfileIcon, setReloadProfileIcon } = useContext(AppContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      location.length == 0 ||
      firstName.length == 0 ||
      lastName.length == 0 ||
      email.length == 0
    ) {
      alert("Fill in all the required fields");
      return;
    }
    setSavingUserProfile(true);
    //the profilePicture could be a File type or Uint8Array type. We need to convert it to Unit8Array.
    const profile = {
      profilePicture:
        profilePicture instanceof Uint8Array
          ? profilePicture
          : await convertImageFileToNat8(profilePicture),
      principal,
      firstName,
      lastName,
      email,
      location,
    };
    const newProfile = await updateUserProfile(profile);

    if (newProfile?.err) {
      alert(getErrorMessage(newProfile.err));
      setSavingUserProfile(false);
    } else {
      updateSessionStorage({ ...newProfile.ok, principal });
      setSavingUserProfile(false);
      setReloadProfileIcon(!reloadProfileIcon);
      updateSnackBarCmp(setShowSnackbarCmp);
    }
  }

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const profile = await getUserProfileFromSessionStorage();
      if (profile?.err) {
        alert(getErrorMessage(profile.err));
      } else {
        setPrincipal(profile.principal);
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setEmail(profile.email);
        setProfilePicture(profile.profilePicture);
        setLocation(profile.location);
        setIsLoading(false);
      }
    }
    init();
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
              style={{ marginBottom: "30px" }}
              variant="outlined"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Enter your location (Country)"
              fullWidth
              type="text"
              variant="outlined"
              defaultValue={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Box style={{ marginTop: "40px" }}>
              <Button variant="outlined" endIcon={<SendIcon />} type="submit">
                Save Changes
              </Button>
            </Box>
          </Box>
        )}
        {LoadingCmp(savingUserProfile)}
        {showSnackbarCmp}
      </Box>
    </>
  );
}
