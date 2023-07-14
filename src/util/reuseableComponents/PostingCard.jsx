import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { createAuthenticatedActor } from "../../canisters/createActor";
import { canisterId, createActor } from "../../declarations/assets";
import {
  canisterId as postCanisterId,
  createActor as postCreateActor,
} from "../../declarations/post";
import { getErrorMessage } from "../ErrorMessages";
import { createObjectURLFromArrayOfBytes } from "../functions";
import PopoverCmp from "./PopoverCmp";
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
  // const [post, setpost] = useState(post);
  //after marking the post as published, we want to show a success message.
  const [showSnackbarCmp, setShowSnackbarCmp] = useState(null);

  const [loading, setLoading] = useState(false);
  //front page image of a posting card
  const [postCardDisplayImage, setPostCardDisplayImage] = useState(null);
  const navigate = useNavigate();
  function updateSnackBarCmp(message, severity) {
    setShowSnackbarCmp(
      <SnackbarCmp
        message={message}
        severity={severity}
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
    const result = await markPostAsPublishedInPostCanister(post);
    if (result?.err) {
      alert(getErrorMessage(result.err));
    } else {
      const message = "We are currently reviewing this post";
      updateSnackBarCmp(message, "info");
    }
    setLoading(false);
  }
  async function markPostAsPublishedInPostCanister(post) {
    const actor = await createAuthenticatedActor(
      postCanisterId,
      postCreateActor
    );
    const result = await actor.markPostAsPublished(post);
    return result;
  }
  async function updatePostDetailsInPostCanister(post) {
    const actor = await createAuthenticatedActor(
      postCanisterId,
      postCreateActor
    );
    await actor.removePostFromMarketplace(post);
    if (post?.err) {
      alert(getErrorMessage(post.err));
      setLoading(false);
      return;
    }
  }
  async function removePostFromMarketplace() {
    setLoading(true);
    post.IsPublished = false;
    await updatePostDetailsInPostCanister(post);
    setLoading(false);
    const message = "Your post has been removed from the marketplace";
    updateSnackBarCmp(message);
  }

  // //update the post if/when the user interacts with the post like publishing to market place or removing from the market place
  // useEffect(() => {
  //   setpost(post);
  // }, [post]);

  useEffect(() => {
    async function loadPost() {
      const actor = await createAuthenticatedActor(canisterId, createActor);
      const imageFile = await actor.getAsset(post.Images[0]);
      if (imageFile?.err) {
        alert(getErrorMessage(imageFile.err));
        return;
      }
      setPostCardDisplayImage(createObjectURLFromArrayOfBytes(imageFile.ok));
    }
    loadPost();
  }, []);

  return (
    <Box>
      {post && (
        <>
          <Card
            onClick={() =>
              !canOnlyMeSeeThisPost && navigate("../view/post/" + post.PostId)
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
                post.Title.length > MAX_lENGTH_OF_TITLE
                  ? post.Title.substring(0, MAX_lENGTH_OF_TITLE) + "..."
                  : post.Title
              }
              subheader={canOnlyMeSeeThisPost ? "Posted at " + post.Date : ""}
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
                {post.Amount} BTC
              </Typography>
              {loading && <CircularProgress size={35} />}
            </Box>
          </Card>
          {/* when the user click on the icon button in the post card, show the popup component */}
          <PopoverCmp
            setPopupPosition={setPopupPosition}
            popupPosition={popupPosition}
            isPublished={post.IsPublished}
            postId={post.PostId}
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
