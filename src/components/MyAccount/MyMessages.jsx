import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { profile } from "../../declarations/profile";
import { conversation } from "../../declarations/conversation";
import { getAuthenticatedConversationUser } from "../../util/auth";
import { getFileFromPostAssetCanister } from "../../util/postAssetCanisterFunctions";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../util/functions";
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
      console.log(friendsList);
      setAllMyFriends(friendsList);
    }
    getAllMyFriends();
  }, []);

  async function getMyMessages(friendProfilePicture) {
    setLoading(true);
    const friendsPrincipal = friendProfilePicture.substring(0, 63);
    const authenticatedUser = await getAuthenticatedConversationUser();
    const messages = await authenticatedUser.getMyMessages(friendsPrincipal);
    console.log(messages);
    setMyMessages(messages);
    setLoading(false);
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
            <Typography style={{ textAlign: "center" }}>
              Click on friend to view messages
            </Typography>
            {/* <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem> */}
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
