import { Box, Grid, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFileFromPostAssetCanister } from "../../../canisters/post_assets";
import { post } from "../../../declarations/post";
import { profile } from "../../../declarations/profile";
import { getErrorMessage } from "../../../util/ErrorMessages";
import { createObjectURLFromArrayOfBytes } from "../../../util/functions";
import PostingCard from "../../../util/reuseableComponents/PostingCard";
import { getFilterForSubcategory } from "../../myAccount/createposts/util/postFiltering";
import Header from "../../navigation/header";
import { DrawerContainer, TypographyCmp } from "./style";

/**
 * When the user clicks on a specific subcategory in the home page, this component is responsible for displaying all postings
 * in that subcategory
 * @returns returns all postings in a selected subcategory.
 */

export default function ViewSubcategory() {
  const [loading, setLoading] = useState(false);
  const { categoryName, subcategoryName } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getAllPostingsInSubcategory() {
      setLoading(true);
      const result = await post.getAllPostingsInSubcategory(
        categoryName,
        subcategoryName
      );
      if (result?.err) {
        alert(getErrorMessage(result.err));
      } else {
        setPosts(result.ok);
      }
      setLoading(false);
      // return modifiedPosts;
    }
    getAllPostingsInSubcategory();
  }, []);
  return (
    <Box>
      <Header />
      <Box style={{ display: "flex", marginTop: "40px" }}>
        <DrawerContainer variant="permanent" anchor="left">
          <Toolbar />
          <TypographyCmp variant="h6">Filter</TypographyCmp>
          <div style={{ paddingBottom: "30px", paddingLeft: "15px" }}>
            {getFilterForSubcategory(
              subcategoryName,
              categoryName,
              posts,
              setPosts,
              setLoading
            )}
          </div>
        </DrawerContainer>
        <Box style={{ padding: "24px", width: "100%" }}>
          <Toolbar />
          {loading ? (
            <Typography>No published posts</Typography>
          ) : (
            <>
              <Typography style={{ marginBottom: "30px" }}>
                {subcategoryName} Results
              </Typography>

              {posts.length == 0 ? (
                <Typography>No published posts</Typography>
              ) : (
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
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
    </Box>
  );
}
