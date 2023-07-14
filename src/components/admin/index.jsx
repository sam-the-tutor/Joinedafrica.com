import React, { useEffect, useState } from "react";
import { Box, Grid, Toolbar, Container, Typography } from "@mui/material";
import { createAuthenticatedActor } from "../../canisters/createActor";
import { canisterId, createActor } from "../../declarations/post";
import { getErrorMessage } from "../../util/ErrorMessages";
import PostingCard from "../../util/reuseableComponents/PostingCard";

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      setLoading(true);
      const actor = await createAuthenticatedActor(canisterId, createActor);
      const result = await actor.getPostsOnReview();
      if (result?.err) {
        getErrorMessage(result.err);
      } else {
        setPosts(result.ok);
      }
      setLoading(false);
    }
    init();
  }, []);
  return (
    <Box style={{ marginTop: "50px" }}>
      <Toolbar />
      <Container>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid
            container
            spacing={{ xs: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {posts.map((posting, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <PostingCard post={posting} canOnlyMeSeeThisPost={false} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
