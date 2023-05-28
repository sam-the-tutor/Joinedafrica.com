import { Typography } from "@mui/material";
import React from "react";

import { HowWeStandOutContainer, ImageCmp } from "./style";

export default function HowWeStandOut({ content, imagePath }) {
  return (
    <HowWeStandOutContainer>
      <Typography sx={{ width: "500px" }} variant="h5">
        {content}
      </Typography>
      <ImageCmp component="img" src={imagePath} />
    </HowWeStandOutContainer>
  );
}
