import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItemButton,
  useMediaQuery,
  ListItemIcon,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { getFromSessionStorage } from "../../../../util/functions";
import { getAllMyFriends } from "./util";
import { useTheme } from "@mui/material/styles";

export default function Friends() {
  const [allMyFriends, setAllMyFriends] = useState([]);
  const [myPrincipal, setMyPrincipal] = useState("");
  const theme = useTheme();
  const ismediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );
  useEffect(() => {
    async function init() {
      const friends = await getAllMyFriends();
      setAllMyFriends(friends);
      // setMyPrincipal(getFromSessionStorage("principalId", true));
    }
    init();
  }, []);

  return (
    <Grid
      item
      xs={ismediumScreenSizeAndBelow ? 12 : 3}
      style={{
        borderRight: ismediumScreenSizeAndBelow ? "unset" : "1px solid white",
      }}
    >
      <Grid item xs={12} style={{ padding: "10px" }}>
        <TextField label="Search" variant="outlined" />
      </Grid>
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
          </ListItemButton>
        ))}
      </List>
    </Grid>
  );
}
