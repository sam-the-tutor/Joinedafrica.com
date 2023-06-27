import { AppBar, Grid, Toolbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { profile } from "../../../canisters/profile";
import { AppContext } from "../../../context";
import { getErrorMessage } from "../../../util/ErrorMessages";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import { internet_identity } from "../../auth/Login";
import { updateSessionStorage } from "../../auth/util";
import LeftBar from "../leftbar";
import Authenticate from "./authenticate";
import Logo from "./logo";
import MobileMenu from "./mobileMenu";
import ProfileIcon from "./profileIcon";

export default function Header() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AppContext);
  const [principal, setPrincipal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const currentBrowserPathname = window.location.pathname;

  async function getUserProfile() {
    setIsLoading(true);
    const authenticatedProfileUser = await profile();
    let result = await authenticatedProfileUser.getUserProfile();
    if (result?.err) {
      alert(getErrorMessage(result.err));
    } else {
      updateSessionStorage({ ...result.ok, principal });
      setMobileMoreAnchorEl(null);
      setIsUserLoggedIn(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (principal.length > 0) {
      getUserProfile();
    }
  }, [principal]);

  // in the homepage, we don't want to display the header
  if (currentBrowserPathname == "/") return null;
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Logo setMobileOpen={setMobileOpen} />
            <Grid item>
              {isUserLoggedIn ? (
                <Grid item>
                  <ProfileIcon setPrincipal={setPrincipal} />
                </Grid>
              ) : (
                <Authenticate
                  setMobileMoreAnchorEl={setMobileMoreAnchorEl}
                  internet_identity={internet_identity}
                  setPrincipal={setPrincipal}
                />
              )}
            </Grid>
          </Grid>
        </Toolbar>
        {/* show the 3 icons in mobile devices */}
        <MobileMenu
          mobileMoreAnchorEl={mobileMoreAnchorEl}
          setMobileMoreAnchorEl={setMobileMoreAnchorEl}
          internet_identity={internet_identity}
          setPrincipal={setPrincipal}
        />
      </AppBar>
      {isLoading && LoadingCmp(isLoading)}
      <LeftBar open={mobileOpen} close={() => setMobileOpen(false)} />
    </>
  );
}
