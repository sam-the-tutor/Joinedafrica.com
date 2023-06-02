import { Typography, Grid, Box } from "@mui/material";
import React from "react";

export default function HowWeStandOut({ content, imagePath }) {
  return (
    <Grid
      justifyContent="space-between"
      alignItems="center"
      sx={{
        display: { xs: "block", md: "flex" },
        marginBottom: { xs: "50px", md: "initial" },
      }}
    >
      <Typography
        sx={{
          width: { xs: "100%", md: "500px" },
          marginBottom: { xs: "30px", md: "initial" },
        }}
        variant="h5"
      >
        {content}
      </Typography>
      <Box
        component="img"
        src={imagePath}
        sx={{
          width: { xs: "100%", md: "500px" },
          height: { xs: "200px", md: "400px" },
          objectFit: "contain",
        }}
      ></Box>
    </Grid>
  );
}
