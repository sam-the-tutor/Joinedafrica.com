import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar, Box, Button, Menu, MenuItem } from "@mui/material";
import { enc } from "crypto-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../../util/auth";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../util/functions";
import { getFileFromPostAssetCanister } from "../../util/postAssetCanisterFunctions";

export default function MyProfileMenu() {
  const navigate = useNavigate();

  const [profile, setUserProfile] = useState(null);
  //anchor is used to display more information when the user clicks on thier profile
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    async function LoadProfile() {
      const userProfile = getFromSessionStorage("profilePicture", true);
      const file = await getFileFromPostAssetCanister(
        userProfile.toString(enc.Utf8)
      );
      setUserProfile(createObjectURLFromArrayOfBytes(file._content));
    }
    LoadProfile();
  }, []);
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
