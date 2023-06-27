import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";

import { BoxCmp, TypographyCmp } from "./style";
import { team } from "./team";

export default function Aboutus() {
  return (
    <Box>
      <Toolbar />

      <Box style={{ margin: "40px 20px" }}>
        <Box>
          <Typography>
            Welcome to Joined Africa, the marketplace where sellers advertise
            their products in crypto currency, connecting buyers directly with
            sellers within Africa.
          </Typography>
          <Typography sx={{ mt: "25px", mb: "25px" }}>
            We empower sellers to effortlessly advertise their products, expand
            their reach, and connect with potential buyers. From properties to
            electronics, fashion, and vehicles, buyers can explore diverse
            categories.
          </Typography>
          <Typography>
            Creating a Product is quick and easy - simply choose a category,
            capture an image, set a crypto-price, and provide all the necessary
            details for your product. Our built-in messaging application enables
            seamless communication between buyers and sellers, enabling buyers
            to get all the necessary details about the products they are
            interested in.
          </Typography>
        </Box>
        <TypographyCmp variant="h4">Meet the team</TypographyCmp>
        <BoxCmp>
          {team.map((member, index) => (
            <Box key={index}>
              <img src={member.image} style={member.style} />
              <Typography>{member.name}</Typography>
              <Typography>{member.role}</Typography>
            </Box>
          ))}
        </BoxCmp>
      </Box>
    </Box>
  );
}
