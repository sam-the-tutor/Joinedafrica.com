import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * The information shown associated with a posting card when the three clickable dots are clicked
 */
export default function PopoverCmpDetails({
  isPublished,
  postId,
  markPostAsPublished,
  canOnlyMeSeeThisPost,
  setShowDeletePostPopup,
  setSelectedPostId,
  removePostFromMarketplace,
}) {
  const navigate = useNavigate();
  function deletePost() {
    setShowDeletePostPopup(true);
    setSelectedPostId(postId);
  }

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("../view/post/" + postId)}>
          <ListItemText primary="View created post" />
        </ListItemButton>
      </ListItem>
      {canOnlyMeSeeThisPost ? (
        <>
          {isPublished ? (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => removePostFromMarketplace()}>
                  <ListItemText primary="Remove from market place" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => markPostAsPublished()}>
                  <ListItemText primary="Publish post to market place" />
                </ListItemButton>
              </ListItem>
            </>
          )}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Edit post" />
            </ListItemButton>
          </ListItem>
          {/* only posts that are not published can be deleted. Posts that are published have to first be removed from the 
          marketplace before it can be deleted */}
          {!isPublished && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => deletePost()}>
                <ListItemText primary="Delete post" />
              </ListItemButton>
            </ListItem>
          )}
        </>
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Message creator of post" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  );
}
