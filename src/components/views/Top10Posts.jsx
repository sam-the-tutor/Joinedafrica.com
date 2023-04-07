import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import PostingCard from "../../util/reuseableComponents/PostingCard";

export default function Top10Posts({ name, array }) {
  return (
    <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Typography style={{ marginBottom: "20px" }} variant="h5">
        {name}
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {array.map((posting, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <PostingCard
              post={posting}
              userProfile={posting.creatorProfilePicture}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
