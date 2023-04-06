import React, { useState, useEffect } from "react";
import { Button, Box, Menu, MenuItem, Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { enc } from "crypto-js";
import { getFileFromPostAssetCanister } from "../../util/postAssetCanisterFunctions";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../util/functions";

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
        <MenuItem onClick={() => setAnchorEl(null)}>Log Out</MenuItem>
      </Menu>
    </Box>
  );
}
