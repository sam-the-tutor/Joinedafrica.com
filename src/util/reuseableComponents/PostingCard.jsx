import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { post as postCanister } from "../../canisters/post";
import { getFileFromPostAssetCanister } from "../../canisters/post_assets";
import { getErrorMessage } from "../ErrorMessages";
import { createObjectURLFromArrayOfBytes } from "../functions";
import PopoverCmp from "./PopoverCmp";
import { useNavigate } from "react-router-dom";
import SnackbarCmp from "./SnackbarCmp";

/**
 * Postingcard is a container that shows the relevant details about a post
 */
export default function PostingCard({
  post,
  canOnlyMeSeeThisPost,
  setShowDeletePostPopup,
  setSelectedPostId,
}) {
  //maximum length of characters for description and title
  const MAX_LENGTH_OF_DESCRIPTION = 150;
  const MAX_lENGTH_OF_TITLE = 25;
  //sets the position of the popup for each post card
  const [popupPosition, setPopupPosition] = useState(null);
  //post can be updated by pushlishing the post and any other edit that can be made on a post
  const [updatedPost, setUpdatedPost] = useState(post);
  //after marking the post as published, we want to show a success message.
  const [showSnackbarCmp, setShowSnackbarCmp] = useState(null);

  const [loading, setLoading] = useState(false);
  //front page image of a posting card
  const [postCardDisplayImage, setPostCardDisplayImage] = useState(null);
  const navigate = useNavigate();

  function updateSnackBarCmp(message) {
    setShowSnackbarCmp(
      <SnackbarCmp
        message={message}
        handleClose={(event, reason) => {
          //the user has to click on the alert to close it.
          if (reason != "clickaway") {
            setShowSnackbarCmp(null);
          }
        }}
      />
    );
  }
  async function markPostAsPublished() {
    setLoading(true);
    updatedPost.isPublished = true;
    await markPostAsPublishedInPostCanister(updatedPost);
    setLoading(false);
    const message = "Your post has been to the marketplace";
    updateSnackBarCmp(message);
  }
  async function markPostAsPublishedInPostCanister(updatedPost) {
    const authenticatedUser = await postCanister();
    const post = await authenticatedUser.markPostAsPublished(updatedPost);
    if (post?.err) {
      alert(getErrorMessage(post.err));
      setLoading(false);
      return;
    }
    setUpdatedPost(updatedPost);
  }
  async function updatePostDetailsInPostCanister(updatedPost) {
    const authenticatedUser = await postCanister();
    await authenticatedUser.removePostFromMarketplace(updatedPost);
    if (post?.err) {
      alert(getErrorMessage(post.err));
      setLoading(false);
      return;
    }
    setUpdatedPost(updatedPost);
  }
  async function removePostFromMarketplace() {
    setLoading(true);
    updatedPost.isPublished = false;
    await updatePostDetailsInPostCanister(updatedPost);
    setLoading(false);
    const message = "Your post has been removed from the marketplace";
    updateSnackBarCmp(message);
  }

  //update the post if/when the user interacts with the post like publishing to market place or removing from the market place
  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  useEffect(() => {
    async function loadPost() {
      const file = await getFileFromPostAssetCanister(post.images[0]);
      setPostCardDisplayImage(createObjectURLFromArrayOfBytes(file._content));
    }
    loadPost();
  }, []);

  return (
    <Box>
      {updatedPost && (
        <>
          <Card
            onClick={() =>
              !canOnlyMeSeeThisPost &&
              navigate("../view/post/" + updatedPost.postId)
            }
          >
            <CardHeader
              action={
                canOnlyMeSeeThisPost && (
                  <IconButton
                    onClick={(event) => setPopupPosition(event.currentTarget)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )
              }
              title={
                updatedPost.productTitle.length > MAX_lENGTH_OF_TITLE
                  ? updatedPost.productTitle.substring(0, MAX_lENGTH_OF_TITLE) +
                    "..."
                  : updatedPost.productTitle
              }
              subheader={
                canOnlyMeSeeThisPost
                  ? "Posted at " + updatedPost.creationDateOfPost
                  : ""
              }
            />

            <CardMedia
              component="img"
              height="194"
              image={postCardDisplayImage}
              alt="User created posting"
            />
            <Divider />
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <Typography
                style={{
                  color: "#37a864",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {updatedPost.amount} USDT
              </Typography>
              {loading && <CircularProgress size={35} />}
            </Box>
          </Card>
          {/* when the user click on the icon button in the post card, show the popup component */}
          <PopoverCmp
            setPopupPosition={setPopupPosition}
            popupPosition={popupPosition}
            isPublished={updatedPost.isPublished}
            postId={updatedPost.postId}
            markPostAsPublished={markPostAsPublished}
            canOnlyMeSeeThisPost={canOnlyMeSeeThisPost}
            setShowDeletePostPopup={setShowDeletePostPopup}
            setSelectedPostId={setSelectedPostId}
            removePostFromMarketplace={removePostFromMarketplace}
          />
          {/* show the snackbar when the user has marked the post as published */}

          {showSnackbarCmp}
        </>
      )}
    </Box>
  );
}
