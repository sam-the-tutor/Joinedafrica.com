import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getErrorMessage } from "../../../util/ErrorMessages";
import DeletePostPopup from "../../../util/reuseableComponents/DeletePostPopup";
import PostingCard from "../../../util/reuseableComponents/PostingCard";
import { filterMyPostings, getAllMyPostings } from "./util";

export default function Postings() {
  const [isLoading, setIsLoading] = useState(false);
  const [myPostings, setMyPostings] = useState([]);
  const [showDeletePostPopup, setShowDeletePostPopup] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const postings = await getAllMyPostings();
      if (postings?.err) {
        alert(getErrorMessage(postings.err));
        return;
      }
      setMyPostings(postings.ok);
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
                <Grid item xs={12} sm={4} key={index}>
                  <PostingCard
                    post={posting[0]}
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
