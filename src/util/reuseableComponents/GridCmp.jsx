import React from "react";
import { Grid } from "@mui/material";
export default function GridCmp(posts) {
  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {posts.map((posting, index) => (
      <Grid item xs={2} sm={4} md={4} key={index}>
        <PostingCard
          post={posting}
          userProfile={posting.creatorProfilePicture}
          canOnlyMeSeeThisPost={false}
        />
      </Grid>
    ))}
  </Grid>;
}
