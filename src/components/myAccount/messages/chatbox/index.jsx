import { Principal } from "@dfinity/principal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Button,
  Divider,
  Grid,
  List,
  Box,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { push, ref, set } from "firebase/database";
import { useTheme } from "@mui/material/styles";
import React, { useContext, useEffect, useRef, useState } from "react";

import { conversation as conversationCanister } from "../../../../canisters/conversation";
import { AppContext } from "../../../../context";
import { getFromSessionStorage } from "../../../../util/functions";
import {
  getMyMessages,
  loadNewMessagesFromFirebase,
  removeSeenMessageNotifications,
} from "./util";

export default function Chatbox({ isFriendSelected, setIsFriendSelected }) {
  const [conversation, setConversation] = useState("");
  const [myMessages, setMyMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);
  const myPrincipal = useRef(getFromSessionStorage("principalId", true));
  const { firebaseDB, newMessageNotifications } = useContext(AppContext);

  const theme = useTheme();
  const ismediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );
  useEffect(() => {
    setTimeout(
      () => messageEndRef.current.scrollIntoView({ behavior: "smooth" }),
      500
    );
  });

  useEffect(() => {
    if (isFriendSelected) {
      async function init() {
        setLoading(true);
        const chatMessages = await getMyMessages(
          isFriendSelected.profilePicture
        );
        setMyMessages(chatMessages);
        setLoading(false);
      }
      init();
    }
  }, [isFriendSelected]);

  useEffect(() => {
    function init() {
      if (isFriendSelected) {
        const newMessages = loadNewMessagesFromFirebase(
          isFriendSelected,
          newMessageNotifications,
          firebaseDB
        );
        setMyMessages([...myMessages, ...newMessages[0]]);
        removeSeenMessageNotifications(newMessages[0], firebaseDB);
      }
    }
    init();
  }, [newMessageNotifications, isFriendSelected]);

  async function sendMessage() {
    const myFriendPrincipal = isFriendSelected.profilePicture.substring(0, 63);
    const chatMessage = {
      messageContent: conversation,
      sender: Principal.fromText(myPrincipal.current),
      receiver: Principal.fromText(myFriendPrincipal),
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    };
    setMyMessages([...myMessages, chatMessage]);
    setConversation("");
    //send and save the chat message in the backend and firebase
    const authenticatedUser = await conversationCanister();
    const result = await authenticatedUser.sendMessage(chatMessage);
    //send message notification to the receiver
    const messageRef = ref(firebaseDB, myFriendPrincipal);
    set(push(messageRef), chatMessage);
  }

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

      <Grid
        item
        xs={12}
        md={9}
        component={Paper}
        style={{
          height: "500px",
          position: "relative",
        }}
      >
        <Box style={{ height: "400px", overflowY: "auto" }}>
          {loading ? (
            <Typography style={{ margin: "20px" }}>Loading...</Typography>
          ) : (
            <List>
              {isFriendSelected ? (
                myMessages.map((message, index) => (
                  <ListItem key={index}>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={
                          myPrincipal.current ===
                          Principal.from(message.sender).toText()
                            ? {
                                bgcolor: "success.main",
                                color: "success.contrastText",
                                p: 2,
                              }
                            : {
                                bgcolor: "primary.main",
                                color: "primary.contrastText",
                                p: 2,
                              }
                        }
                        primary={message.messageContent}
                        secondary={message.time + ", " + message.date}
                        secondaryTypographyProps={{
                          color: "black",
                          textAlign: "right",
                        }}
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
          )}
        </Box>

        <Divider />
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          style={{
            position: "absolute",
            bottom: "20px",
          }}
        >
          <Grid item xs={7}>
            <TextField
              id="outlined-basic-email"
              label="Enter message..."
              fullWidth
              value={conversation}
              onChange={(event) => setConversation(event.target.value)}
            />
          </Grid>
          <Grid item xs={3} align="right">
            <Button variant="outlined" onClick={sendMessage}>
              SEND
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
