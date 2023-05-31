import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PostingCard from "../../../util/reuseableComponents/PostingCard";
import { getFilterForSubcategory } from "../../myAccount/createposts/util/postFiltering";
import Header from "../../navigation/header";
import FilterPost from "./filter";
import { DrawerContainer, TypographyCmp } from "./style";
import { getAllPostingsInSubcategory } from "./util";

/**
 * When the user clicks on a specific subcategory in the home page, this component is responsible for displaying all postings
 * in that subcategory
 * @returns returns all postings in a selected subcategory.
 */

export default function ViewSubcategory() {
  const [loading, setLoading] = useState(false);
  const { categoryName, subcategoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function init() {
      setLoading(true);
      const postings = await getAllPostingsInSubcategory(
        categoryName,
        subcategoryName
      );
      setPosts(postings);
      setLoading(false);
    }
    init();
  }, []);
  return (
    <Box>
      <Header />
      <Box style={{ display: "flex", marginTop: "40px" }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <DrawerContainer variant="permanent" anchor="left">
            <Toolbar />
            <TypographyCmp variant="h6">Filte postsr</TypographyCmp>
            <div
              style={{
                paddingBottom: "30px",
                paddingLeft: "15px",
              }}
            >
              {getFilterForSubcategory(
                subcategoryName,
                categoryName,
                posts,
                setPosts,
                setLoading
              )}
            </div>
          </DrawerContainer>
        </Box>

        <Box style={{ padding: "24px", width: "100%" }}>
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
                <Grid
                  container
                  spacing={{ xs: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {posts.map((posting, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
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
        </Box>
      </Box>
      <FilterPost
        open={mobileOpen}
        close={() => setMobileOpen(false)}
        categoryName={categoryName}
        subcategoryName={subcategoryName}
        posts={posts}
        setPosts={setPosts}
        setLoading={setLoading}
      />
    </Box>
  );
}
