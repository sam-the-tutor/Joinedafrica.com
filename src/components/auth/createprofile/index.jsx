import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../../context";
import { getErrorMessage } from "../../../util/ErrorMessages";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import SnackbarCmp from "../../../util/reuseableComponents/SnackbarCmp";
import { internet_identity } from "../Login";
import { updateSessionStorage } from "../util";
import { IdentitySetup, Image, ImageContainer, ParentContainer } from "./style";
import { createUserProfile } from "./util";

export default function CreateProfile() {
  const [principal, setPrincipal] = useState("");
  const [userProfile, setProfile] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    email: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState(null);

  const { setIsUserLoggedIn } = useContext(AppContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (principal.length == 0) {
      setSnackbar(
        <SnackbarCmp
          message="You have to set up your identity"
          severity="error"
          handleClose={(event, reason) => {
            //the user has to click on the alert to close it.
            if (reason != "clickaway") {
              setSnackbar(null);
            }
          }}
        />
      );
      return;
    }
    setIsLoading(true);
    const result = await createUserProfile({ ...userProfile, principal });
    if (result?.err) {
      alert(getErrorMessage(result.err));
    } else {
      updateSessionStorage({ ...result.ok, principal });
      setIsUserLoggedIn(true);
      navigate("/home");
    }
    setIsLoading(false);
  }

  return (
    <>
      <ParentContainer component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>
          Create profile
        </Typography>
        <Box>
          <ImageContainer>
            {userProfile.profilePicture && (
              <Image
                src={URL.createObjectURL(userProfile.profilePicture)}
                alt="User selected profile"
              />
            )}
          </ImageContainer>
          <input
            type="file"
            accept="image/jpeg, image/png"
            required
            role="image"
            onChange={(e) => {
              setProfile({
                ...userProfile,
                profilePicture: e.target.files[0],
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
          data-testid="sdasdf"
          style={{ marginTop: "30px" }}
          value={userProfile.firstName}
          required
          onChange={(e) =>
            setProfile({ ...userProfile, firstName: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="Enter your last name"
          variant="outlined"
          role="lastName"
          value={userProfile.lastName}
          style={{ margin: "30px 0" }}
          required
          onChange={(e) =>
            setProfile({ ...userProfile, lastName: e.target.value })
          }
        />
        <TextField
          label="Enter your email address"
          fullWidth
          type="email"
          variant="outlined"
          role="email"
          value={userProfile.email}
          required
          onChange={(e) =>
            setProfile({ ...userProfile, email: e.target.value })
          }
        />
        <TextField
          label="Enter your location (Country)"
          fullWidth
          role="location"
          placeholder="Nigeria"
          style={{ margin: "30px 0" }}
          variant="outlined"
          value={userProfile.location}
          required
          onChange={(e) =>
            setProfile({ ...userProfile, location: e.target.value })
          }
        />

        <IdentitySetup
          onClick={async () => await internet_identity(setPrincipal)}
        >
          <Typography style={{ marginRight: "5px" }}>
            Set up your identity
          </Typography>
          <OpenInNewIcon />
        </IdentitySetup>
        <Box style={{ marginTop: "40px" }}>
          <Button
            variant="outlined"
            endIcon={<SendIcon />}
            type="submit"
            role="submitBtn"
          >
            Create Profile
          </Button>
        </Box>
      </ParentContainer>
      {LoadingCmp(isLoading)}
      {snackbar}
    </>
  );
}
