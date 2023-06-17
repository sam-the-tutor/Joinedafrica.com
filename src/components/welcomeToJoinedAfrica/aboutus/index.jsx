import React from "react";
import { Typography, Box, Toolbar } from "@mui/material";
import { team } from "./team";

export default function Aboutus() {
  return (
    <Box>
      <Toolbar />
      <Box  sx = {{marginTop: {md : "40px" , xs :"20px"}}}>
        <Typography style={{ textAlign: "center" }} variant="h4">
          Vision of Joined Africa
        </Typography>
      </Box>

      <Box>
        <Box style={{ margin: "20px" }}>
          <Typography>
           Joined Africa aims to create a future in Africa where a seller can list
           thier products for sale and a buyer from the same country or across border can 
           contact the seller to purchase the product in one currency. Making Africa Joined again.
          </Typography>
        </Box>
      </Box>

      <Box
        style={{
          marginBottom: "40px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
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
