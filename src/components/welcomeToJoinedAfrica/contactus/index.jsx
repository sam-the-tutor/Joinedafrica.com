import React from "react";
import { Box, Typography,Toolbar } from "@mui/material";

export default function Contactus() {

  return (
    <Box>
      <Toolbar />
      <Typography variant="h4" sx = {{textAlign:"center", margin:{md:"40px 20px 20px 20px", xs : "20px"}}}>Anything you want us to know?</Typography>
      <Typography style = {{textAlign:'center'}}>You can reach us at joinedafrica@gmail.com</Typography>
    </Box>
  );
}
