import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PostingCard from "./PostingCard";


export function Top10Posts({ name, posts }) {
  return (
    <Box style={{ marginTop: "20px", marginBottom: "20px" }} key={posts}>
      <Typography style={{ marginBottom: "20px" }} variant="h6">
        {name}
      </Typography>
      <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {posts.map((posting, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <PostingCard post={posting} canOnlyMeSeeThisPost={false} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
