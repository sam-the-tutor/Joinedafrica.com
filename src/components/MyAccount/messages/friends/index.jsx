import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { getFromSessionStorage } from "../../../../util/functions";
import { useTheme } from "@mui/material/styles";

import { getAllMyFriends } from "./util";

export default function Friends({ setIsFriendSelected }) {
  const [allMyFriends, setAllMyFriends] = useState([]);
  const [myPrincipal, setMyPrincipal] = useState("");
  const theme = useTheme();
  const ismediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );
  useEffect(() => {
    async function init() {
      //show set loading
      const friends = await getAllMyFriends();
      setAllMyFriends(friends);
      // setMyPrincipal(getFromSessionStorage("principalId", true));
    }
    init();
  }, []);

  return (
    <Grid
      item
      component={Paper}
      xs={12}
      md={3}
      style={{
        borderRight: ismediumScreenSizeAndBelow ? "unset" : "1px solid white",
        height: "70vh",
      }}
    >
      <Grid item xs={12} style={{ padding: "10px" }}>
        <TextField
          label="Search..."
          variant="outlined"
          style={{ width: "100%" }}
        />
      </Grid>
      <List>
        {allMyFriends.map((profile, index) => (
          <ListItem
            key={index}
            style={{ cursor: "pointer" }}
            // onClick={() => getMyMessages(profile.profilePicture)}
            onClick={() => setIsFriendSelected(profile)}
          >
            <ListItemIcon>
              <Avatar src={profile.profileImageFile} />
            </ListItemIcon>
            <ListItemText
              primary={profile.firstName + " " + profile.lastName}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
