import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { PropTypes } from "prop-types";

import PostingCard from "../../../../util/reuseableComponents/PostingCard";
import { BoxContainer } from "./style";

export default function ViewFeed({
  posts,
  loading,
  subcategoryName,
  setMobileOpen,
}) {
  return (
    <BoxContainer>
      <Toolbar />
      {loading ? (
        <Typography>Loadng...</Typography>
      ) : (
        <>
          <Button
            variant="outlined"
            sx={{
              marginBottom: "24px",
              display: { xs: "block", md: "none" },
            }}
            onClick={() => setMobileOpen(true)}
          >
            filter posts
          </Button>
          <Typography style={{ marginBottom: "30px" }}>
            {subcategoryName} Results
          </Typography>
          {posts.length == 0 ? (
            <Typography>No published posts</Typography>
          ) : (
            <Grid container spacing={{ xs: 2 }}>
              {posts.map((posting, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <PostingCard
                    post={posting}
                    userProfile={posting.creatorProfilePicture}
                    canOnlyMeSeeThisPost={false}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </BoxContainer>
  );
}

ViewFeed.propTypes = {
  posts: PropTypes.array,
  loading: PropTypes.bool,
  subcategoryName: PropTypes.string,
  setMobileOpen: PropTypes.func,
};
