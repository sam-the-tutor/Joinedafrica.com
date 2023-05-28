import MailIcon from "@mui/icons-material/Mail";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  AppBar,
  Badge,
  Button,
  Input,
  Stack,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InputContainer, SearchIconCmp } from "./style";

import ProfileIcon from "./profileIcon";

import { setUserProfileDetails } from "./util";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import { internet_identity } from "../../auth/Login";

export default function Header({ refreshComponent }) {
  const [principal, setPrincipal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") == "true"
  );

  /**
   * If the user already has an account, the user is able to log in and their information saved in session storage
   */
  useEffect(() => {
    console.log(principal);
    async function getUserProfile() {
      //making sure the actor isn't null.
      console.log(principal);
      if (principal.length > 0) {
        setIsLoading(true);
        await setUserProfileDetails(principal);
        setIsLoading(false);
        setIsUserLoggedIn(true);
      }
    }
    getUserProfile();
    //set the users principal as a dependency incase the user already has an account and clicks on login
    //not create account
  }, [principal]);

  const currentPageLocation = location.pathname;
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: "1201" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Joined Africa
          </Typography>
          {currentPageLocation != "/my-account" &&
            currentPageLocation != "/create-profile" && (
              <InputContainer>
                <SearchIconCmp />
                <Input
                  placeholder="search..."
                  sx={{ width: "100%", color: "black" }}
                />
              </InputContainer>
            )}

          <Grid sx={{ alignItems: "center" }}>
            {isUserLoggedIn ? (
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Badge badgeContent={4} color="primary">
                    <MailIcon color="action" />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge>
                    <NotificationsNoneIcon color="action" />
                  </Badge>
                </Grid>
                <Grid item>
                  <ProfileIcon refreshComponent={refreshComponent} />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item>
                  <Link to="/create-profile" style={{ textDecoration: "none" }}>
                    <Button variant="outlined">Create Profile</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      onClick={async () =>
                        setPrincipal(await internet_identity())
                      }
                      // onClick={() => InternetIdentityAuthentication(setPrincipal)}
                    >
                      Log in
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      {isLoading && LoadingCmp(isLoading)}
    </>
  );
}
