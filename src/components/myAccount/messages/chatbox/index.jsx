import { Principal } from "@dfinity/principal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "../../../../context";
import { getFromSessionStorage } from "../../../../util/functions";
import { BoxCmp, ButtonCmp, GridCmp } from "./style";
import {
  getMyMessages,
  loadNewMessages,
  removeSeenMessageNotifications,
  sendMessage,
} from "./util";

export default function Chatbox({ isFriendSelected, setIsFriendSelected }) {
  const [conversation, setConversation] = useState("");
  const [myMessages, setMyMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);
  const { firebaseDB, newMessageNotifications } = useContext(AppContext);

  const theme = useTheme();
  const isMediumScreenSizeAndBelow = useMediaQuery(
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
        const newMessages = loadNewMessages(
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

  async function handleSendMessage() {
    await sendMessage({
      myMessages,
      setMyMessages,
      conversation,
      setConversation,
      firebaseDB,
      isFriendSelected,
    });
  }

  return (
    <>
      {/* Only display the back button when the viewport is medium size and below */}
      {isMediumScreenSizeAndBelow && (
        <ButtonCmp onClick={() => setIsFriendSelected(null)}>
          <ArrowBackIosIcon />
          Go Back
        </ButtonCmp>
      )}

      <GridCmp item xs={12} md={9} component={Paper}>
        <BoxCmp>
          {loading ? (
            <Typography style={{ margin: "20px" }}>Loading...</Typography>
          ) : (
            <List>
              <ChatMessages
                myMessages={myMessages}
                isFriendSelected={isFriendSelected}
              />
              <div ref={messageEndRef} />
            </List>
          )}
        </BoxCmp>

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
            <Button variant="outlined" onClick={handleSendMessage}>
              SEND
            </Button>
          </Grid>
        </Grid>
      </GridCmp>
    </>
  );
}

function ChatMessage({ message, isCurrentUser }) {
  const messageBackgroundColor = isCurrentUser
    ? "success.main"
    : "primary.main";
  const messageColor = isCurrentUser
    ? "success.contrastText"
    : "primary.contrastText";

  return (
    <ListItem>
      <Grid item xs={12}>
        <ListItemText
          sx={{
            bgcolor: messageBackgroundColor,
            color: messageColor,
            p: 2,
          }}
          primary={message.messageContent}
          secondary={`${message.time}, ${message.date}`}
          secondaryTypographyProps={{
            color: "black",
            textAlign: "right",
          }}
        />
      </Grid>
    </ListItem>
  );
}

function ChatMessages({ myMessages, isFriendSelected }) {
  const myPrincipal = useRef(getFromSessionStorage("principalId", true));

  if (!isFriendSelected) {
    return (
      <ListItem style={{ textAlign: "center" }}>
        You have to select a friend to view your message(s)
      </ListItem>
    );
  }

  return (
    <>
      {myMessages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
          isCurrentUser={
            myPrincipal.current === Principal.from(message.sender).toText()
          }
        />
      ))}
    </>
  );
}
