import React from "react";
import { Popover } from "@mui/material/";
import PopoverCmpDetails from "./PopoverCmpDetails";

/**
 * The three clickable dots associated to a postingcard that displays more information about a post
 */
export default function PopoverCmp({
  popupPosition,
  setPopupPosition,
  isPublished,
  postId,
  markPostAsPublished,
}) {
  return (
    <Popover
      open={Boolean(popupPosition)}
      anchorEl={popupPosition}
      onClose={() => setPopupPosition(null)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <PopoverCmpDetails
        isPublished={isPublished}
        postId={postId}
        markPostAsPublished={markPostAsPublished}
      />
    </Popover>
  );
}
