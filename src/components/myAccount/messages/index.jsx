import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PropTypes } from "prop-types";

import React, { useState } from "react";
import Chatbox from "./chatbox";
import Friends from "./friends";

function MobileView({ isFriendSelected, setIsFriendSelected }) {
  return (
    <>
      {isFriendSelected ? (
        <Chatbox
          isFriendSelected={isFriendSelected}
          setIsFriendSelected={setIsFriendSelected}
        />
      ) : (
        <Friends setIsFriendSelected={setIsFriendSelected} />
      )}
    </>
  );
}

function DesktopView({ isFriendSelected, setIsFriendSelected }) {
  return (
    <>
      <Friends setIsFriendSelected={setIsFriendSelected} />
      <Chatbox isFriendSelected={isFriendSelected} />
    </>
  );
}

export default function Messages() {
  const theme = useTheme();
  const isMediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );
  const [isFriendSelected, setIsFriendSelected] = useState(null);

  return (
    <Grid container style={{ width: "100%", marginBottom: "20px" }}>
      {isMediumScreenSizeAndBelow ? (
        <MobileView
          isFriendSelected={isFriendSelected}
          setIsFriendSelected={setIsFriendSelected}
        />
      ) : (
        <DesktopView
          isFriendSelected={isFriendSelected}
          setIsFriendSelected={setIsFriendSelected}
        />
      )}
    </Grid>
  );
}

MobileView.propTypes = {
  isFriendSelected: PropTypes.object,
  setIsFriendSelected: PropTypes.func,
};

DesktopView.propTypes = {
  isFriendSelected: PropTypes.object,
  setIsFriendSelected: PropTypes.func,
};
