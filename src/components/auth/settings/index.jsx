import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import SendIcon from "@mui/icons-material/Send";

import { AppContext } from "../../../context";
import { createObjectURLFromArrayOfBytes } from "../../../util/functions";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import SnackbarCmp from "../../../util/reuseableComponents/SnackbarCmp";

import useHandleSubmit from "./hooks/useHandleSubmit";
import useStateHandler from "./hooks/useStateHandler";
import { Image, ImageContainer } from "./style";

export default function Settings() {
  const { handleSubmit, loadingProgress, setLoadingProgress } =
    useHandleSubmit();
  const { profile, setProfile, componentMount } = useStateHandler();
  const { reloadProfileIcon, setReloadProfileIcon } = useContext(AppContext);

  async function submitProfile(e) {
    e.preventDefault();
    await handleSubmit(profile);
    setReloadProfileIcon(!reloadProfileIcon);
  }
  return (
    <>
      <Box>
        {componentMount ? (
          <Typography>Loading...</Typography>
        ) : (
          <Box component="form" onSubmit={(e) => submitProfile(e)}>
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
                  src={createObjectURLFromArrayOfBytes(profile.profilePicture)}
                  alt="User selected profile"
                  role="pro"
                />
              </ImageContainer>
              <input
                type="file"
                role="image"
                name="profilePicture"
                accept="image/jpeg, image/png"
                onChange={(e) => {
                  setProfile({
                    ...profile,
                    [e.target.name]: e.target.files[0],
                  });
                }}
              />
              <Typography>Choose profile image</Typography>
            </Box>
            <TextField
              fullWidth
              label="Enter your first name"
              variant="outlined"
              role="firstName"
              name="firstName"
              style={{ marginTop: "30px" }}
              defaultValue={profile.firstName}
              onChange={(e) => {
                setProfile({ ...profile, [e.target.name]: e.target.value });
              }}
            />
            <TextField
              fullWidth
              label="Enter your last name"
              variant="outlined"
              role="lastName"
              style={{ margin: "30px 0" }}
              name="lastName"
              defaultValue={profile.lastName}
              onChange={(e) => {
                setProfile({ ...profile, [e.target.name]: e.target.value });
              }}
            />
            <TextField
              label="Enter your email address"
              fullWidth
              type="email"
              role="email"
              style={{ marginBottom: "30px" }}
              variant="outlined"
              defaultValue={profile.email}
              name="email"
              onChange={(e) => {
                setProfile({ ...profile, [e.target.name]: e.target.value });
              }}
            />
            <TextField
              label="Enter your location (Country)"
              fullWidth
              type="text"
              role="location"
              variant="outlined"
              defaultValue={profile.location}
              name="location"
              onChange={(e) => {
                setProfile({ ...profile, [e.target.name]: e.target.value });
              }}
            />
            <Box style={{ marginTop: "40px" }}>
              <Button
                role="submitBtn"
                type="submit"
                variant="outlined"
                endIcon={<SendIcon />}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        )}

        {LoadingCmp(loadingProgress == "loading")}
        {loadingProgress == "completedLoading" && (
          <SnackbarCmp
            message="Your profile has been updated!"
            handleClose={(event, reason) => {
              //the user has to click on the alert to close it.
              if (reason != "clickaway") {
                setLoadingProgress("notLoading");
              }
            }}
          />
        )}
      </Box>
    </>
  );
}
