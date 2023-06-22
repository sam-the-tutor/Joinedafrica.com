import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";

import { BoxCmp, TypographyCmp } from "./style";
import { team } from "./team";

export default function Aboutus() {
  return (
    <Box>
      <Toolbar />
      <Box style={{ margin: "40px 20px" }}>
        <TypographyCmp variant="h4">Creators</TypographyCmp>
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
