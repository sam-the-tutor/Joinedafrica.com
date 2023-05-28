import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Button,
  Divider,
  Grid,
  List,
  ListItemText,
  ListItem,
  Paper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState, useRef } from "react";
import { loadNewMessages } from "./util";

export default function Chatbox({ isFriendSelected, setIsFriendSelected }) {
  const [conversation, setConveration] = useState([]);
  const [myMessages, setMyMessages] = useState([]);
  const messageEndRef = useRef(null);
  //i can get the users principal from thier profile picture
  const theme = useTheme();
  const ismediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );

  useEffect(() => {
    async function init() {
      const chatMessages = await loadNewMessages(
        isFriendSelected.profilePicture
      );
      setMyMessages(chatMessages);
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    init();
  }, []);
  return (
    <>
      {/* only display the back button when the viewport is medium size and below */}
      {ismediumScreenSizeAndBelow && (
        <Button
          style={{ marginBottom: "10px", marginTop: "10px" }}
          onClick={() => setIsFriendSelected(null)}
        >
          <ArrowBackIosIcon />
          Go Back
        </Button>
      )}

      <Grid item xs={12} md={9} component={Paper}>
        <List style={{ height: "70vh", overflowY: "auto" }}>
          {isFriendSelected ? (
            myMessages.map((message, index) => (
              <ListItem key={index}>
                <Grid item xs={12}>
                  <ListItemText
                    //my messages i send will ALWAYS have secondReceiver's length > 0
                    //because that is the other users principal
                    // align={message.secondReceiver.length > 0 ? "right" : "left"}
                    primary={message.messageContent}
                  />
                </Grid>
              </ListItem>
            ))
          ) : (
            <ListItem style={{ textAlign: "center" }}>
              You have to select a friend to view your message(s)
            </ListItem>
          )}
          <div ref={messageEndRef} />
        </List>
        <Divider />
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          style={{ marginBottom: "10px" }}
        >
          <Grid item xs={7}>
            <TextField
              id="outlined-basic-email"
              label="Enter message..."
              fullWidth
              // onChange={(event) => setConveration(event.target.value)}
            />
          </Grid>
          <Grid item xs={3} align="right">
            <Button
              variant="outlined"
              //   onClick={sendMessage}
            >
              SEND
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
