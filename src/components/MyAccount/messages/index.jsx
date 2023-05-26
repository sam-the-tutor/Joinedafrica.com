import React from "react";
import { Grid, Paper, useMediaQuery, Divider } from "@mui/material";
import Friends from "./friends";
import Chatbox from "./chatbox";
import { useTheme } from "@mui/material/styles";
export default function Messages() {
  const theme = useTheme();
  const ismediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );
  return (
    <Grid container component={Paper} style={{ width: "100%", height: "80vh" }}>
      <Friends />
      <Chatbox />
    </Grid>
  );
}
