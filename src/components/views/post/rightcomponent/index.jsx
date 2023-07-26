import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useState, useContext } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { AppContext } from "../../../../context";
import { getFromSessionStorage } from "../../../../util/functions";
import { sendMessage } from "./util";
import { Principal } from "@dfinity/principal";

export default function RightComponent({ post }) {
  const [userMessage, setUserMessage] = useState("");
  const { firebaseDB } = useContext(AppContext);
  const [sendMessageProgress, setSendMessageProgress] = useState(null);

  // sending message to the creator of the post
  async function handleMessage() {
    if (sessionStorage.getItem("principalId") == null) {
      //user has to login or create a profile before they can message someoone
      alert(
        "You have to log in or create a profile to be able to send a message"
      );
      return;
    }
    const loggedInUserPrincipalId = getFromSessionStorage("principalId", true);
    if (post.CreatorOfPostId.toText() == loggedInUserPrincipalId) {
      alert("You can't message youself!");
    } else {
      setSendMessageProgress(
        <Box>
          <CircularProgress size={35} />
          <Typography>Sending...</Typography>
        </Box>
      );
      const result = await sendMessage(userMessage, firebaseDB, post);
      if (result?.err) {
        alert("error");
      } else {
        setSendMessageProgress(
          <Box>
            <CheckCircleIcon fontSize="medium" />
            <Typography>Message sent</Typography>
          </Box>
        );
      }
    }
  }

  return (
    <Grid item md={3} xs={12}>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          placeholder="Send a message to the creator of the post."
          multiline
          rows={7}
          style={{ marginBottom: "15px" }}
          onChange={(event) => setUserMessage(event.target.value)}
        />
        <Button variant="outlined" onClick={handleMessage}>
          {sendMessageProgress || "Send message"}
        </Button>
      </Box>
      <Box component={Paper} sx={{ mt: "40px" }}>
        <Typography
          style={{ textAlign: "center", padding: "10px" }}
          variant="h6"
        >
          Safety Tips
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 4 }}>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Arrange to meet the seller in a secure public location." />
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Thoroughly examine the item to ensure it meets your expectations." />
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Avoid revealing personal information." />
          </ListItem>
        </List>
      </Box>
    </Grid>
  );
}

RightComponent.propTypes = {
  post: PropTypes.object,
};
