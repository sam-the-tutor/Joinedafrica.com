import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { deletePost } from "../../components/myAccount/postings/util";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeletePostPopup({
  showDeletePostPopup,
  setShowDeletePostPopup,
  selectedPostId,
  filterFromFrontend,
}) {
  const [isLoading, setIsLoading] = useState(false);
  //only posts that are not published to the marketplace can be deleted. A post that is published to the marketplace
  //has to first be removed from the marketplace before they can be deleted.
  async function deletePostFromBackAndFrontend() {
    setIsLoading(true);
    filterFromFrontend(selectedPostId);
    await deletePost(selectedPostId);
    setIsLoading(false);
    setShowDeletePostPopup(false);
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
        {isLoading ? (
          <Typography>Deleting...</Typography>
        ) : (
          <>
            <Button onClick={() => deletePostFromBackAndFrontend()}>Yes</Button>
            <Button onClick={() => setShowDeletePostPopup(false)}>No</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
