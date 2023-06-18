import React from "react";
import { Typography, Box, Toolbar } from "@mui/material";
import { team } from "./team";

export default function Aboutus() {
  return (
    <Box>
      <Toolbar />
      <Box
        style={{margin:"40px 20px"}}
      >
        <Typography
          style={{ textAlign: "center", marginBottom: "20px" }}
          variant="h4"
        >
          Creators
        </Typography>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {team.map((member, index) => (
            <Box key={index}>
              <img src={member.image} style={member.style} />
              <Typography>{member.name}</Typography>
              <Typography>{member.role}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
