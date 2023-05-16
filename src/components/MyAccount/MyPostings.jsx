import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PostingCard from "../../util/reuseableComponents/PostingCard";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../util/functions";
import { getFileFromPostAssetCanister } from "../../util/postAssetCanisterFunctions";
import { getAuthenticatedUser } from "../../util/auth";
import { getErrorMessage } from "../../util/ErrorMessages";
import DeletePostPopup from "../../util/reuseableComponents/DeletePostPopup";

//display all my postings
export default function MyPostings() {
  const [isLoading, setIsLoading] = useState(false);
  //logged in users postings
  const [myPostings, setMyPostings] = useState([]);
  //logged in users profile
  const [userProfile, setUserProfile] = useState();
  const [showDeletePostPopup, setShowDeletePostPopup] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");

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
  function filterMyPostings() {
    const myNewPostings = myPostings.filter(
      (posting) => posting.postId != selectedPostId
    );
    setMyPostings(myNewPostings);
  }
  return (
    <>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
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
                  setShowDeletePostPopup={(value) =>
                    setShowDeletePostPopup(value)
                  }
                  setSelectedPostId={(postId) => setSelectedPostId(postId)}
                />
              </Grid>
            ))}
          </Grid>
          <DeletePostPopup
            showDeletePostPopup={showDeletePostPopup}
            setShowDeletePostPopup={(value) => setShowDeletePostPopup(value)}
            selectedPostId={selectedPostId}
            filterMyPostings={() => filterMyPostings()}
            setIsLoading={setIsLoading}
          />
        </Box>
      )}
    </>
  );
}
