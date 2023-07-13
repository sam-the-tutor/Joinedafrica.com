import React from "react";
import { Box, Typography } from "@mui/material";

function CreateSpecification(postDetails) {
  return (
    <>
      {postDetails.map(([specification, value], index) => (
        <Box
          style={{
            display: "flex",
          }}
          key={index}
        >
          <Typography style={{ marginRight: "10px" }}>
            {specification.replaceAll("_", " ")} :
          </Typography>
          <Typography>{value}</Typography>
        </Box>
      ))}
    </>
  );
}

export default CreateSpecification;
