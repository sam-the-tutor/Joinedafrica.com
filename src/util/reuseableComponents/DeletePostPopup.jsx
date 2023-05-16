import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { getAuthenticatedPostAssetUser } from "../auth";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeletePostPopup({
  showDeletePostPopup,
  setShowDeletePostPopup,
  filterMyPostings,
  selectedPostId,
  setIsLoading,
}) {
  //only posts that are not published to the marketplace can be deleted. A post that is published to the marketplace
  //has to first be removed from the marketplace before they can be deleted.
  async function deletePost() {
    setIsLoading(true);
    const authenticatedUser = await getAuthenticatedPostAssetUser();
    await authenticatedUser.deletePost(selectedPostId);
    setShowDeletePostPopup(false);
    filterMyPostings();
    setIsLoading(false);
  }

  return (
    <Dialog
      open={showDeletePostPopup}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => deletePost()}>Yes</Button>
        <Button onClick={() => setShowDeletePostPopup(false)}>No</Button>
      </DialogActions>
    </Dialog>
  );
}
