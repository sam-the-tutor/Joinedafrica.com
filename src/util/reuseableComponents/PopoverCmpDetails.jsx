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
}) {
  const navigate = useNavigate();
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
                <ListItemButton>
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
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Edit post" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Delete post" />
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Message creator of post" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  );
}
