import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getErrorMessage } from "../../../util/ErrorMessages";
import DeletePostPopup from "../../../util/reuseableComponents/DeletePostPopup";
import PostingCard from "../../../util/reuseableComponents/PostingCard";
import { filterMyPostings, getAllMyPostings, getUserProfile } from "./util";

export default function Postings() {
  const [isLoading, setIsLoading] = useState(false);
  //logged in users postings
  const [myPostings, setMyPostings] = useState([]);
  //logged in users profile
  const [userProfile, setUserProfile] = useState();
  const [showDeletePostPopup, setShowDeletePostPopup] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      //the order of execution isn't important so we use promise.all()
      const [postings, profile] = await Promise.all([
        getAllMyPostings(),
        getUserProfile(),
      ]);
      if (postings?.err) {
        alert(getErrorMessage(postings.err));
        return;
      }
      setMyPostings(postings.ok);
      setUserProfile(profile);
      setIsLoading(false);
    }
    init();
  }, []);

  function filterFromFrontend(selectedPostId) {
    const filteredPosts = filterMyPostings(myPostings, selectedPostId);
    setMyPostings(filteredPosts);
  }
  return (
    <Box>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
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
      )}

      <DeletePostPopup
        showDeletePostPopup={showDeletePostPopup}
        setShowDeletePostPopup={(value) => setShowDeletePostPopup(value)}
        selectedPostId={selectedPostId}
        filterFromFrontend={(selectedPostId) =>
          filterFromFrontend(selectedPostId)
        }
      />
    </Box>
  );
}
