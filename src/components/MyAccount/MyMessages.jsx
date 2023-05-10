import React, { useEffect, useState, useContext, useRef } from "react";
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

export default function MyMessages() {
  const [allMyFriends, setAllMyFriends] = useState([]);
  const [myMessages, setMyMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myPrincipal, setMyPrincipal] = useState("");
  const [myFriendPrincipal, setMyFriendPrincipal] = useState("");
  //messages send to my friends principal
  const [conversation, setConveration] = useState("");
  const { newMessageNotification, setNewMessageNotification } =
    useContext(AppContext);

  const messageEndRef = useRef(null);

  //contains checks if the search time is in the list of messages. We do this so we can know when there are new messages or not
  //when there are new messages, the searchTime won't be fouund in the myMessages list

  function contains(searchTime) {
    for (var i = 0; i < myMessages.length; i++) {
      const pastTime = myMessages[i].date + "" + myMessages[i].time;
      if (pastTime === searchTime) return true;
    }
    return false;
  }

  //sorting the messages by date and time
  function sort(newMessages) {
    return newMessages.sort((child, parent) => {
      if (child.date === parent.date) {
        return parent.time < child.time;
      } else {
        //
        return parent.date < child.date;
      }
    });
  }
  useEffect(() => {
    async function loadNewMessages() {
      //check if i'm currently chatting with a friend
      if (myFriendPrincipal.length > 0) {
        const result = newMessageNotification.filter(
          (newMessage) => !contains(newMessage.date + "" + newMessage.time)
        );
        console.log(result);
        if (result.length > 0) {
          const newMessages = [...myMessages, ...result];
          setMyMessages([...sort(newMessages)]);
          messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
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
    const friendsPrincipal = friendProfilePicture.substring(0, 63);
    setMyFriendPrincipal(friendsPrincipal);
    const authenticatedUser = await getAuthenticatedConversationUser();
    const messages = await authenticatedUser.getMyMessages(friendsPrincipal);
    setMyMessages([...sort(messages.ok).reverse()]);
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
    myMessage.mainReceiver = Principal.fromText(myPrincipal);
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
                <div key={index} id={index}>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          //my messages i send will ALWAYS have secondReceiver's length > 0
                          //because that is the other users principal
                          align={
                            message.secondReceiver.length > 0 ? "right" : "left"
                          }
                          primary={message.messageContent}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align={
                            message.secondReceiver.length > 0 ? "right" : "left"
                          }
                          secondary={message.time}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                </div>
              ))}
            <div ref={messageEndRef} />
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
            <Grid item xs={1} align="right">
              <Button variant="outlined" onClick={sendMessage}>
                SEND
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
