import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar, Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAuthenticatedActor } from "../../../canisters/createActor";
import { AppContext } from "../../../context";
import { canisterId, createActor } from "../../../declarations/assets";
import { getErrorMessage } from "../../../util/ErrorMessages";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../../util/functions";
import { logout } from "../../auth/Logout";

export default function ProfileIcon({ setPrincipal }) {
  const navigate = useNavigate();
  const [profile, setUserProfile] = useState(null);
  //anchor is used to display more information when the user clicks on thier profile
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { reloadProfileIcon, setIsUserLoggedIn } = useContext(AppContext);

  useEffect(() => {
    async function LoadProfile() {
      const assetId = getFromSessionStorage("profilePicture", true);
      const actor = await createAuthenticatedActor(canisterId, createActor);
      const imageFile = await actor.getAsset(assetId);
      if (imageFile?.err) {
        alert(getErrorMessage(imageFile.err));
      } else {
        setUserProfile(createObjectURLFromArrayOfBytes(imageFile.ok));
      }
    }
    LoadProfile();
  }, [reloadProfileIcon]);
  function logUserOut() {
    logout();
    setIsUserLoggedIn(false);
    setPrincipal("");
    navigate("/home");
  }
  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Avatar src={profile} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate("/my-account")}>My Account</MenuItem>
        <MenuItem onClick={() => logUserOut()}>Log Out</MenuItem>
      </Menu>
    </Box>
  );
}
