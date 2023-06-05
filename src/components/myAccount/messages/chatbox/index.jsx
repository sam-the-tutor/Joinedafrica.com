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
import React, { useEffect, useState, useRef, useContext } from "react";
import { loadNewMessages } from "./util";
import { conversation as conversationCanister } from "../../../../canisters/conversation";
import { getFromSessionStorage } from "../../../../util/functions";
import { Principal } from "@dfinity/principal";
import { ref, set, push, remove } from "firebase/database";
import { AppContext } from "../../../../context";
export default function Chatbox({ isFriendSelected, setIsFriendSelected }) {
  const [conversation, setConversation] = useState("");
  const [myMessages, setMyMessages] = useState([]);
  const messageEndRef = useRef(null);
  const myPrincipal = useRef(getFromSessionStorage("principalId", true));
  const { firebaseDB, newMessageNotifications } = useContext(AppContext);
  //i can get the users principal from thier profile picture
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
    async function init() {
      const chatMessages = await loadNewMessages(
        isFriendSelected.profilePicture
      );
      setMyMessages(chatMessages);
      // messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    init();
  }, []);

  useEffect(() => {
    function loadNewMessagesFromFirebase() {
      const myFriendPrincipal = isFriendSelected.profilePicture.substring(
        0,
        63
      );
      const newMessagesFromSelectedFriend = [];
      const newMessagesFromOtherFriends = [];
      newMessageNotifications.forEach((message) => {
        const sendersPrincipal = Principal.from(message.sender).toText();
        if (sendersPrincipal === myFriendPrincipal) {
          newMessagesFromSelectedFriend.push(message);
        } else {
          newMessagesFromOtherFriends.push(message);
        }
      });
      setMyMessages([...myMessages, ...newMessagesFromSelectedFriend]);
      removeSeenMessageNotifications(newMessagesFromSelectedFriend);
    }
    loadNewMessagesFromFirebase();
  }, [newMessageNotifications]);

  function removeSeenMessageNotifications(newMessagesFromSelectedFriend) {
    newMessagesFromSelectedFriend.forEach((message) => {
      remove(ref(firebaseDB, `${myPrincipal.current}/${message.id}`));
    });
  }

  async function sendMessage() {
    const myFriendPrincipal = isFriendSelected.profilePicture.substring(0, 63);
    const chatMessage = {
      messageContent: conversation,
      sender: Principal.fromText(myPrincipal.current),
      receiver: Principal.fromText(myFriendPrincipal),
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    };
    //display the new message in the senders chatbox
    setMyMessages([...myMessages, chatMessage]);
    // messageEndRef.current.scrollIntoView({ behavior: "smooth" });
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

      <Grid item xs={12} md={9} component={Paper}>
        <List style={{ height: "70vh", overflowY: "auto" }}>
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
