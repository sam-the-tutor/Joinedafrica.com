import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "./profileIcon";
import { AppContext } from "../../../context";
import { setUserProfileDetails } from "./util";

import { getFromSessionStorage } from "../../../util/functions";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import { internet_identity } from "../../auth/Login";
import LeftBar from "../leftbar";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const {isUserLoggedIn, setIsUserLoggedIn } = useContext(AppContext);
  const [principal, setPrincipal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  
  // const isUserLoggedIn = useRef(getFromSessionStorage("isLoggedIn") == "true");
  const currentBrowserPathname = window.location.pathname;

  async function getUserProfile() {
      setIsLoading(true);
      await setUserProfileDetails(principal);
      setIsLoading(false);
      setMobileMoreAnchorEl(null);
      setIsUserLoggedIn(true);
  }
  /**
   * If the user already has an account, the user is able to log in and their information saved in session storage
   */
  useEffect(() => {
    if(principal.length > 0){
      getUserProfile();
    }
  }, [principal]);

  /**
   * If the user doesn't have an account, then they have to create a profile. 
   */
  // useEffect(() => {
  //   if(isUserLoggedIn){
  //     getUserProfile();
  //   }
  // }, [isUserLoggedIn])

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={() => setMobileMoreAnchorEl(null)}
    >
      <div>
        <MenuItem>
          <Link to="/create-profile">
            <Button>Create Profile</Button>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link>
            <Button onClick={async () => await internet_identity(setPrincipal)}>
              Log in
            </Button>
          </Link>
        </MenuItem>
      </div>
    </Menu>
  );
console.log(currentBrowserPathname);
  // in the homepage, we don't want to display the header
  if(currentBrowserPathname == "/") return null;
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item display="flex" alignItems="center">
              <Grid item>
                <IconButton
                  onClick={() => setMobileOpen(true)}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item sx={{ display: "flex", cursor: "pointer" }}>
                <Typography variant="h6" onClick={() => navigate("../home")}>
                  Joined Africa
                </Typography>
              </Grid>
              <Grid item sx={{ display: { xs: "none", md: "block" } }}>
                <img
                  src="/logo/Logo_without_background.png"
                  style={{ width: "80px" }}
                />
              </Grid>
            </Grid>
            <Grid item>
              {isUserLoggedIn ? (
                <Grid item>
                  <ProfileIcon />
                </Grid>
              ) : (
                <Grid item container spacing={2}>
                  <Grid item sx={{ display: { xs: "block", md: "none" } }}>
                    <IconButton
                      onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}
                    >
                      <MoreIcon />
                    </IconButton>
                  </Grid>

                  <Grid item sx={{ display: { md: "block", xs: "none" } }}>
                    <Link
                      to="/create-profile"
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outlined">Create Profile</Button>
                    </Link>
                  </Grid>
                  <Grid item sx={{ display: { md: "block", xs: "none" } }}>
                    <Link style={{ textDecoration: "none" }}>
                      <Button
                        variant="outlined"
                        onClick={async () =>
                          await internet_identity(setPrincipal)
                        }
                      >
                        Log in
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Toolbar>
        {renderMobileMenu}
      </AppBar>
      {isLoading && LoadingCmp(isLoading)}
      <LeftBar open={mobileOpen} close={() => setMobileOpen(false)} />
    </>
  );
}
