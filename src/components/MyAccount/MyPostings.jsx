import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { LoadingCmp } from "../../util/reuseableComponents/LoadingCmp";
import PostingCard from "../../util/reuseableComponents/PostingCard";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../util/functions";
import { getFileFromPostAssetCanister } from "../../util/postAssetCanisterFunctions";
import { getAuthenticatedUser } from "../../util/auth";
import { getErrorMessage } from "../../util/ErrorMessages";

//display all my postings
export default function MyPostings() {
  const [isLoading, setIsLoading] = useState(false);
  //logged in users postings
  const [myPostings, setMyPostings] = useState([]);
  //logged in users profile
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    async function getAllMyPostings() {
      setIsLoading(true);
      const authenticatedUser = await getAuthenticatedUser();
      const post = await authenticatedUser.getAllMyPostings();
      console.log(post);
      if (post?.err) {
        alert(getErrorMessage(post.err));
        setIsLoading(false);
        return;
      }
      setMyPostings(post.ok);
      const file = await getFileFromPostAssetCanister(
        getFromSessionStorage("profilePicture", true)
      );
      setUserProfile(createObjectURLFromArrayOfBytes(file._content));

      setIsLoading(false);
    }
    getAllMyPostings();
  }, []);
  return (
    <>
      {!isLoading && (
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {myPostings.map((posting, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <PostingCard
                  post={posting[0]}
                  userProfile={userProfile}
                  canOnlyMeSeeThisPost={true}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {isLoading && LoadingCmp(isLoading)}
    </>
  );
}
