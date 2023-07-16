import { Typography, Box, Toolbar, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: "center" }}>
      <Toolbar sx={{ mt: "50px" }} />
      <Typography>This page doesn't exist.</Typography>
      <Button
        variant="outlined"
        sx={{ mt: "20px" }}
        onClick={() => navigate("home")}
      >
        Go back to home page
      </Button>
    </Box>
  );
}

export default Page404;
