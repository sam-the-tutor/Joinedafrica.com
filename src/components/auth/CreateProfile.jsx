import React, { useState } from "react";
import { Container, TextField, Box, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  InternetIdentityAuthentication,
  getAuthenticatedUser,
} from "../../util/auth";
import { LoadingCmp } from "../../util/reuseableComponents/LoadingCmp";
import { useNavigate } from "react-router-dom";
import {
  Image,
  IdentitySetup,
  ImageContainer,
} from "../../styling/auth/CreateProfile";
import {
  removeFileFromPostAssetCanister,
  uploadFileToPostAssetCanister,
} from "../../util/postAssetCanisterFunctions";
import { setSessionStorage } from "../../util/functions";
import { joinedafrica } from "../../declarations/joinedafrica";

export default function CreateProfile() {
  const [principal, setPrincipal] = useState("");
  const [userProfile, setProfile] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // navigation so we can go back to the home page after saving the users profile
  const navigate = useNavigate();

  /**
   *  When the user submits the form, the users profile is sent to the post asset canister, the users information
   *  is saved in session storage and the users information is sent to the database. If the user already has an account,
   *  the sessions storage will be cleared and the users profile picture deleted from post asset canister.
   *
   * @param {*} e e is the onsubmit event
   */
  async function handleSubmit(e) {
    e.preventDefault();
    if (principal.length == 0) {
      alert("You have to set up your identity");
      return;
    }
    setIsLoading(true);
    const createdProfile = { ...userProfile };
    const profileImagePath =
      principal + "/profile/" + userProfile.profilePicture.name;
    const key = await uploadFileToPostAssetCanister(
      userProfile.profilePicture,
      profileImagePath
    );
    createdProfile.profilePicture = key;
    createdProfile.principalId = principal;

    //encrypt the users email and principalId and profilePicture only as they are confidential.
    setSessionStorage("firstName", userProfile.firstName, false);
    setSessionStorage("lastName", userProfile.lastName, false);
    setSessionStorage("email", userProfile.email, true);
    setSessionStorage("principalId", principal, true);
    setSessionStorage("profilePicture", key, true);
    setSessionStorage("isLoggedIn", "true", false);

    const authenticatedUser = await getAuthenticatedUser();
    let result = await authenticatedUser.createUserProfile(createdProfile);

    if (result?.err) {
      //the user is trying to create an account with the same identity
      sessionStorage.clear();
      //remove the image we just saved from the post canister
      await removeFileFromPostAssetCanister(key);
      //handle the error
      alert("User already exists");
    } else {
      navigate("/home");
    }
    setIsLoading(false);
  }

  return (
    <>
      <Container
        component="form"
        style={{ marginTop: "50px" }}
        onSubmit={handleSubmit}
      >
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
          style={{ marginTop: "30px" }}
          required
          onChange={(e) =>
            setProfile({ ...userProfile, firstName: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="Enter your last name"
          variant="outlined"
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
          required
          onChange={(e) =>
            setProfile({ ...userProfile, email: e.target.value })
          }
        />
        <IdentitySetup
          onClick={() => InternetIdentityAuthentication(setPrincipal)}
        >
          <Typography style={{ marginRight: "5px" }}>
            Set up your identity
          </Typography>
          <OpenInNewIcon />
        </IdentitySetup>
        <Box style={{ marginTop: "40px" }}>
          <Button variant="outlined" endIcon={<SendIcon />} type="submit">
            Create Profile
          </Button>
        </Box>
      </Container>
      {isLoading && LoadingCmp(isLoading)}
    </>
  );
}
