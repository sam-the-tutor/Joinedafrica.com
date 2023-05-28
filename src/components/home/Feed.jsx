import React from "react";
import { Box, Typography, Toolbar } from "@mui/material";
import Content from "./Content";

export default function Feed() {
  return (
    <Box style={{ marginTop: "20px", padding: "24px" }}>
      <Toolbar />
      <Typography>Showing top 10 postings from all categories</Typography>
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
    </Box>
  );
}
