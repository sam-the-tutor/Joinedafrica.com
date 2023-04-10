import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Input,
  Stack,
  Badge,
  Button,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MyProfileMenu from "../MyAccount/MyprofileMenu";
import {
  InputContainer,
  SearchIconCmp,
} from "../../styling/appStructure/Header";
import { Link } from "react-router-dom";
import {
  InternetIdentityAuthentication,
  getAuthenticatedUser,
} from "../../util/auth";
import { LoadingCmp } from "../../util/reuseableComponents/LoadingCmp";
import { setSessionStorage } from "../../util/functions";
import { getErrorMessage } from "../../util/ErrorMessages";

export default function Header() {
  //users principal
  const [principal, setPrincipal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedin] = useState(
    sessionStorage.getItem("isLoggedIn") == "true"
  );

  /**
   * If the user already has an account, the user is able to log in and their information saved in session storage
   */
  useEffect(() => {
    async function getUserProfile() {
      //making sure the actor isn't null.
      if (principal.length > 0) {
        setIsLoading(true);
        const authenticatedUser = await getAuthenticatedUser();
        let result = await authenticatedUser.getUserProfile();
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
          setIsUserLoggedin(true);
        }
        setIsLoading(false);
      }
    }
    getUserProfile();
    //set the users principal as a dependency incase the user already has an account and clicks on login
    //not create account
  }, [principal]);
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: "1201" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Joined Africa
          </Typography>
          <InputContainer>
            <SearchIconCmp />
            <Input
              placeholder="search..."
              sx={{ width: "100%", color: "black" }}
            />
          </InputContainer>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            {isUserLoggedIn ? (
              <>
                <Badge badgeContent={4} color="primary">
                  <MailIcon color="action" />
                </Badge>
                <Badge>
                  <NotificationsNoneIcon color="action" />
                </Badge>
                <MyProfileMenu />
              </>
            ) : (
              <>
                <Link to="/create-profile" style={{ textDecoration: "none" }}>
                  <Button variant="outlined">Create Profile</Button>
                </Link>
                <Link style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    onClick={() => InternetIdentityAuthentication(setPrincipal)}
                  >
                    Log in
                  </Button>
                </Link>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {isLoading && LoadingCmp(isLoading)}
    </>
  );
}
