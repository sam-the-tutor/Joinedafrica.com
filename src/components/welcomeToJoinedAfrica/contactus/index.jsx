import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { LinkCmp } from "./style";
import { Link } from "react-router-dom";

export default function Contactus() {
  return (
    <Box>
      <Toolbar />
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          margin: { md: "40px 20px 20px 20px", xs: "20px" },
        }}
      >
        Anything you want us to know?
      </Typography>
      <ButtonMailto email="joinedafrica@gmail.com" />
      <Typography sx={{ textAlign: "center", mt: "20px", mb: "20px" }}>
        OR
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <LinkCmp href="https://www.linkedin.com/company/joinedafrica/">
          <LinkedInIcon />
        </LinkCmp>
        <LinkCmp href="https://www.instagram.com/joinedafrica/">
          <InstagramIcon />
        </LinkCmp>
        <LinkCmp href="https://www.facebook.com/JoinedAfrica">
          <FacebookIcon />
        </LinkCmp>
        <LinkCmp href="https://www.youtube.com/@JoinedAfrica/">
          <YouTubeIcon />
        </LinkCmp>
      </Box>
    </Box>
  );
}

const ButtonMailto = ({ email }) => {
  return (
    <Link
      to="#"
      style={{ color: "white", display: "block", textAlign: "center" }}
      onClick={(e) => {
        window.location.href = "mailto:" + email;
        e.preventDefault();
      }}
    >
      {email}
    </Link>
  );
};
