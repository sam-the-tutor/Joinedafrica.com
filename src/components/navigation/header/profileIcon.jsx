import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar, Box, Button, Menu, MenuItem } from "@mui/material";
import { enc } from "crypto-js";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../../util/functions";

import { getFileFromPostAssetCanister } from "../../../canisters/post_assets";
import { logout } from "../../auth/Logout";
import { AppContext } from "../../../context";
// import { getFileFromPostAssetCanister } from "../../util/postAssetCanisterFunctions";

export default function ProfileIcon() {
  const navigate = useNavigate();

  const [profile, setUserProfile] = useState(null);
  //anchor is used to display more information when the user clicks on thier profile
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const {reloadProfileIcon}  = useContext(AppContext )
  
  useEffect(() => {
    async function LoadProfile() {
      const userProfile = getFromSessionStorage("profilePicture", true);
      const file = await getFileFromPostAssetCanister(userProfile);
      setUserProfile(createObjectURLFromArrayOfBytes(file._content));
    }
    LoadProfile();
  }, [reloadProfileIcon]);
  function logUserOut() {
    logout();
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
