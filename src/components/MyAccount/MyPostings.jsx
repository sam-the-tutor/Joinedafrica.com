import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getErrorMessage } from "../../util/ErrorMessages";
import { getAuthenticatedPostUser } from "../../util/auth";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../util/functions";
import {
  getFileFromPostAssetCanister,
  removeFileFromPostAssetCanister,
} from "../../util/postAssetCanisterFunctions";
import DeletePostPopup from "../../util/reuseableComponents/DeletePostPopup";
import PostingCard from "../../util/reuseableComponents/PostingCard";

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
      const authenticatedUser = await getAuthenticatedPostUser();
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
      console.log(myPostings);
      setIsLoading(false);
    }
    getAllMyPostings();
  }, []);
  function deletePostImagesFromPostAssetCanister(images) {
    images.forEach(async (image) => {
      await removeFileFromPostAssetCanister(image);
    });
  }
  function filterMyPostings() {
    const myNewPostings = myPostings.filter((posting) => {
      const condition = posting[0].postId != selectedPostId;
      if (!condition) {
        deletePostImagesFromPostAssetCanister(posting[0].images);
      }
      return condition;
    });

    setMyPostings(myNewPostings);
  }
  return (
    <>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {myPostings.length == 0
              ? "You have no postings"
              : myPostings.map((posting, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
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
          />
        </Box>
      )}
    </>
  );
}
