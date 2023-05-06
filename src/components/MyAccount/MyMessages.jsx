import React, { useEffect, useState, useContext } from "react";
// import { makeStyles } from "@mui/material/styles";

import {
  Grid,
  Paper,
  Box,
  Divider,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { profile } from "../../declarations/profile";
import { conversation } from "../../declarations/conversation";
import {
  getAuthenticatedConversationUser,
  getAuthenticatedMessageNotificationWorker,
} from "../../util/auth";
import { getFileFromPostAssetCanister } from "../../util/postAssetCanisterFunctions";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../util/functions";
import { Principal } from "@dfinity/principal";
import { AppContext } from "../../context";
// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   headBG: {
//     backgroundColor: "#e0e0e0",
//   },
//   messageArea: {
//     height: "70vh",
//     overflowY: "auto",
//   },
// });

export default function MyMessages() {
  const [allMyFriends, setAllMyFriends] = useState([]);
  const [myMessages, setMyMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myPrincipal, setMyPrincipal] = useState("");
  const [myFriendPrincipal, setMyFriendPrincipal] = useState("");
  //messages send to my friends principal
  const [conversation, setConveration] = useState("");
  const { newMessageNotification } = useContext(AppContext);

  useEffect(() => {
    function loadNewMessages() {
      //check if i'm currently chatting with a friend
      if (myFriendPrincipal.length > 0) {
        // setMyMessages([...myMessages, [...newMessageNotification].reverse()]);
        //checking if i sent my friend any message
        const newMessages1 = newMessageNotification.filter(
          (notification) =>
            myPrincipal === notification.mainReceiver.toText() &&
            myFriendPrincipal === notification.secondReceiver
        );
        //checking if my friend sent me any message
        const newMessages2 = newMessageNotification.filter(
          (notification) => myFriendPrincipal === notification.sender.toText()
        );
        //sort the messages by date and time
        console.log([...newMessages1, ...newMessages2]);
        //if i am currently chatting with my friend, i want to to display all our messages
        // newMessageNotification.filter(message => )
        // console.log(newMessageNotification);
      }
    }
    loadNewMessages();
  }, [newMessageNotification]);

  useEffect(() => {
    async function getAllMyFriends() {
      const authenticatedUser = await getAuthenticatedConversationUser();
      const myFriends = await authenticatedUser.getAllMyFriends();
      if (myFriends?.err) {
        alert("sdfas");
        return;
      }
      const friendsList = [];
      await Promise.all(
        myFriends.ok.map(async (userId) => {
          const friendProfile = await profile.getUserProfilePicture(userId);
          const iamgeFile = await getFileFromPostAssetCanister(
            friendProfile.ok.profilePicture
          );
          friendsList.push({
            ...friendProfile.ok,
            profileImageFile: createObjectURLFromArrayOfBytes(
              iamgeFile._content
            ),
          });
        })
      );

      setAllMyFriends(friendsList);
      setMyPrincipal(getFromSessionStorage("principalId", true));
    }
    getAllMyFriends();
  }, []);

  async function getMyMessages(friendProfilePicture) {
    setLoading(true);
    const friendsPrincipal = friendProfilePicture.substring(0, 63);
    setMyFriendPrincipal(friendsPrincipal);
    const authenticatedUser = await getAuthenticatedConversationUser();
    const messages = await authenticatedUser.getMyMessages(friendsPrincipal);
    setMyMessages(messages.ok.reverse());
    setLoading(false);
  }
  async function sendMessage() {
    if (myFriendPrincipal.length == 0) {
      alert("You have to click on a friend to send message to them");
      return;
    }
    const chatMessage = {
      messageContent: conversation,
      sender: Principal.fromText(myPrincipal),
      mainReceiver: Principal.fromText(myFriendPrincipal),
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      secondReceiver: "",
    };

    const myMessage = { ...chatMessage };
    myMessage.receiver = Principal.fromText(myPrincipal);
    myMessage.secondReceiver = myFriendPrincipal;
    //send the message to the creators posts notification
    const authenticatedWorker =
      await getAuthenticatedMessageNotificationWorker();
    //send the message to my message notifications canister so it can be pulled
    //using webworker and displayed in the chatbox
    await authenticatedWorker.sendNotification(myMessage);
    //send the notification to my friend
    await authenticatedWorker.sendNotification(chatMessage);
    const authenticatedUser = await getAuthenticatedConversationUser();
    //save message in conversations canister
    await authenticatedUser.sendMessage(chatMessage);
  }
  return (
    <div>
      <Grid
        container
        component={Paper}
        style={{ width: "100%", height: "80vh" }}
      >
        {/* friendsList */}
        <Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField label="Search" variant="outlined" />
          </Grid>
          <Divider />
          <List>
            {allMyFriends.map((profile, index) => (
              <ListItemButton
                key={index}
                onClick={() => getMyMessages(profile.profilePicture)}
              >
                <ListItemIcon>
                  <Avatar src={profile.profileImageFile} />
                </ListItemIcon>
                <ListItemText
                  primary={profile.firstName + " " + profile.lastName}
                />
                {/* <ListItemText secondary="online" align="right"></ListItemText> */}
              </ListItemButton>
            ))}
          </List>
        </Grid>
        {/* conversation */}
        <Grid item xs={9}>
          <List style={{ height: "70vh", overflowY: "auto" }}>
            {myMessages.length == 0 && (
              <Typography style={{ textAlign: "center" }}>
                Click on friend to view messages
              </Typography>
            )}

            {myMessages.length > 0 &&
              myMessages.map((message, index) => (
                <ListItem key={index}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        align={
                          message.sender.toText() == myPrincipal
                            ? "right"
                            : "left"
                        }
                        primary={message.messageContent}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={
                          message.sender.toText() == myPrincipal
                            ? "right"
                            : "left"
                        }
                        secondary={message.time}
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Enter message..."
                fullWidth
                onChange={(event) => setConveration(event.target.value)}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Button variant="outlined" onClick={sendMessage}>
                SEND
              </Button>
              {/* <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
