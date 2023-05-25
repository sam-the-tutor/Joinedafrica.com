import React from "react";

export default function Friends() {
  return (
    <Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
      <Grid item xs={12} style={{ padding: "10px" }}>
        <TextField label="Search" variant="outlined" />
      </Grid>
      <Divider />
      {/* myfriends */}
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
