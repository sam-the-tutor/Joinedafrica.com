import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  List,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";
import Header from "../appStructure/Header";
import {
  DrawerContainer,
  TypographyCmp,
} from "../../styling/appStructure/LeftBar";
import { useParams } from "react-router-dom";
import { getFilterForSubcategory } from "../../util/posts/PostFiltering";
import { profile } from "../../declarations/profile";
import { post } from "../../declarations/post";
import { getErrorMessage } from "../../util/ErrorMessages";
import PostingCard from "../../util/reuseableComponents/PostingCard";
import { getFileFromPostAssetCanister } from "../../util/postAssetCanisterFunctions";
import { createObjectURLFromArrayOfBytes } from "../../util/functions";

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
        //Looping through each subcategory and adding the profile picture of each posts createor in
        //the top10Subcategories list
        var modifiedPosts = [];
        await Promise.all(
          result.ok.map(async (createdPost) => {
            const creatorOfPost = await profile.getUserProfilePicture(
              createdPost.creatorOfPostId
            );
            const iamgeFile = await getFileFromPostAssetCanister(
              creatorOfPost.ok.profilePicture
            );
            modifiedPosts.push({
              ...createdPost,
              creatorProfilePicture: createObjectURLFromArrayOfBytes(
                iamgeFile._content
              ),
            });
          })
        );
        setPosts(modifiedPosts);
      }
      setLoading(false);
      return modifiedPosts;
    }
    getAllPostingsInSubcategory();
  }, []);
  return (
    <Box>
      <Header />
      <Box style={{ display: "flex" }}>
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
