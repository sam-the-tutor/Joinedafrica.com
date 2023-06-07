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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import { getAllMyFriends } from "./util";

export default function Friends({ setIsFriendSelected }) {
  const [allMyFriends, setAllMyFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const ismediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );

  useEffect(() => {
    async function init() {
      setLoading(true);
      const friends = await getAllMyFriends();
      setAllMyFriends(friends);
      setLoading(false);
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
        height: "500px",
      }}
    >
      {" "}
      {loading ? (
        <Typography style={{ margin: "15px" }}>Loading...</Typography>
      ) : (
        <List>
          {allMyFriends.map((profile, index) => (
            <ListItem
              key={index}
              style={{ cursor: "pointer" }}
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
      )}
    </Grid>
  );
}
