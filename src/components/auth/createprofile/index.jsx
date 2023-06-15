import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { uploadFileToPostAssetCanister } from "../../../canisters/post_assets";
import { profile } from "../../../canisters/profile";
import { getErrorMessage } from "../../../util/ErrorMessages";
import { getUniqueId, setSessionStorage } from "../../../util/functions";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import { getCities } from "../../myAccount/createposts/listOfCategories";
import Header from "../../navigation/header";
import { internet_identity } from "../Login";
import { IdentitySetup, Image, ImageContainer } from "./style";
import { AppContext } from "../../../context";

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
  // navigation so we can go back to the home page after saving the users profile
  const navigate = useNavigate();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AppContext);

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
    console.log(createdProfile);
    const profileImagePath = principal + "/profile/" + getUniqueId();
    console.log(userProfile.profilePicture);
    const key = await uploadFileToPostAssetCanister(
      userProfile.profilePicture,
      profileImagePath
    );
    createdProfile.profilePicture = key;
    // createdProfile.principalId = principal;

    const authenticatedProfileUser = await profile();
    let result = await authenticatedProfileUser.createUserProfile(
      createdProfile
    );
    console.log(result);
    if (result?.err) {
      //handle the error
      alert(getErrorMessage(result.err));
    } else {
      // encrypt the users email and principalId and profilePicture only as they are confidential.
      setSessionStorage("firstName", userProfile.firstName, false);
      setSessionStorage("lastName", userProfile.lastName, false);
      setSessionStorage("email", userProfile.email, true);
      setSessionStorage("principalId", principal, true);
      setSessionStorage("profilePicture", key, true);
      setSessionStorage("isLoggedIn", "true", false);
      setIsUserLoggedIn(true);
      navigate("/home");
    }
    setIsLoading(false);
  }

  return (
    <>
      <Header />
      <Container
        component="form"
        style={{ marginTop: "130px", marginBottom: "80px" }}
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
        <TextField
          label="Country"
          fullWidth
          placeholder = "Nigeria"
          style={{ margin: "30px 0" }}
          variant="outlined"
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
          <Button variant="outlined" endIcon={<SendIcon />} type="submit">
            Create Profile
          </Button>
        </Box>
      </Container>
      {isLoading && LoadingCmp(isLoading)}
    </>
  );
}