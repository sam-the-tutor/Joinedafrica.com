import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { getAllMyFriends } from "./util";

const LoadingMessage = () => (
  <Typography style={{ margin: "15px" }}>Loading...</Typography>
);

const EmptyFriendsListMessage = () => (
  <Typography style={{ margin: "15px" }}>
    You have no friends at the moment
  </Typography>
);

const FriendListItem = ({ profile, onClick }) => (
  <ListItem style={{ cursor: "pointer" }} onClick={() => onClick(profile)}>
    <ListItemIcon>
      <Avatar src={profile.profileImageFile} />
    </ListItemIcon>
    <ListItemText primary={`${profile.firstName} ${profile.lastName}`} />
  </ListItem>
);

export default function Friends({ setIsFriendSelected }) {
  const [allMyFriends, setAllMyFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );

  useEffect(() => {
    async function fetchFriendsData() {
      setLoading(true);
      const friends = await getAllMyFriends();
      setAllMyFriends(friends);
      setLoading(false);
    }
    fetchFriendsData();
  }, []);

  const renderFriendsList = () => {
    if (loading) {
      return <LoadingMessage />;
    }
    if (allMyFriends.length === 0) {
      return <EmptyFriendsListMessage />;
    }
    return (
      <List>
        {allMyFriends.map((profile, index) => (
          <FriendListItem
            key={index}
            profile={profile}
            onClick={setIsFriendSelected}
          />
        ))}
      </List>
    );
  };

  return (
    <Grid
      item
      component={Paper}
      xs={12}
      md={3}
      style={{
        borderRight: isMediumScreenSizeAndBelow ? "unset" : "1px solid white",
        height: "500px",
      }}
    >
      {renderFriendsList()}
    </Grid>
  );
}

FriendListItem.prototype = {
  profile: PropTypes.object,
  onClick: PropTypes.func,
};

Friends.propTypes = {
  setIsFriendSelected: PropTypes.func,
};
