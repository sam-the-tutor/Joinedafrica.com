import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PopoverCmp from "./PopoverCmp";
import {
  Divider,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import SnackbarCmp from "./SnackbarCmp";
import { createObjectURLFromArrayOfBytes } from "../functions";
import { getFileFromPostAssetCanister } from "../postAssetCanisterFunctions";
import { getAuthenticatedUser } from "../auth";
import { getErrorMessage } from "../ErrorMessages";

/**
 * Postingcard is a container that shows the relevant details about a post
 */
export default function PostingCard({
  post,
  userProfile,
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
  const [showSnackbarCmp, setShowSnackbarCmp] = useState(false);

  const [loading, setLoading] = useState(false);
  //front page image of a posting card
  const [postCardDisplayImage, setPostCardDisplayImage] = useState(null);

  async function markPostAsPublished() {
    setLoading(true);
    updatedPost.isPublished = true;
    const authenticatedUser = await getAuthenticatedUser();
    const post = await authenticatedUser.markPostAsPublished(updatedPost);
    if (post?.err) {
      alert(getErrorMessage(post.err));
      setLoading(false);
      return;
    }
    setUpdatedPost(updatedPost);
    setLoading(false);
    setShowSnackbarCmp(true);
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
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={<Avatar src={userProfile} />}
              action={
                <IconButton
                  onClick={(event) => setPopupPosition(event.currentTarget)}
                >
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                updatedPost.productTitle.length > MAX_lENGTH_OF_TITLE
                  ? updatedPost.productTitle.substring(0, MAX_lENGTH_OF_TITLE) +
                    "..."
                  : updatedPost.productTitle
              }
              subheader={"Posted at " + updatedPost.creationDateOfPost}
            />

            <CardMedia
              component="img"
              height="194"
              image={postCardDisplayImage}
              alt="User created posting"
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {updatedPost.productDescription.length >
                MAX_LENGTH_OF_DESCRIPTION
                  ? updatedPost.productDescription.substring(
                      0,
                      MAX_LENGTH_OF_DESCRIPTION
                    ) + "..."
                  : updatedPost.productDescription}
              </Typography>
            </CardContent>
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
          />
          {/* show the snackbar when the user has marked the post as published */}
          {showSnackbarCmp && (
            <SnackbarCmp
              message="Post is published to marketplace!"
              open={showSnackbarCmp}
              handleClose={(event, reason) => {
                //the user has to click on the alert to close it.
                if (reason != "clickaway") {
                  setShowSnackbarCmp(false);
                }
              }}
              severity="success"
            />
          )}
        </>
      )}
    </Box>
  );
}
