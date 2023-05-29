import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

import Chatbox from "./chatbox";
import Friends from "./friends";

export default function Messages() {
  const theme = useTheme();
  const ismediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );
  const [isFriendSelected, setIsFriendSelected] = useState(null);
  return (
    <Grid container style={{ width: "100%", marginBottom: "20px" }}>
      {ismediumScreenSizeAndBelow ? (
        <>
          {isFriendSelected ? (
            <Chatbox
              isFriendSelected={isFriendSelected}
              // when the user is in chatbox in mobile view, users can go back by clicking on the back button
              //to view thier list of friends again
              setIsFriendSelected={setIsFriendSelected}
            />
          ) : (
            <Friends setIsFriendSelected={setIsFriendSelected} />
          )}
        </>
      ) : (
        <>
          <Friends setIsFriendSelected={setIsFriendSelected} />
          <Chatbox isFriendSelected={isFriendSelected} />
        </>
      )}
    </Grid>
  );
}
