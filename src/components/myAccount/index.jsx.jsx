import { Box, Container, Toolbar, useMediaQuery } from "@mui/material";

import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

import Settings from "../auth/settings";
import CreatePost from "./createposts";
import Messages from "./messages";
import Postings from "./postings";
import { TabCmp } from "./style";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MyAccount() {
  const theme = useTheme();
  const ismediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Toolbar style={{ marginTop: "40px" }} />
      <Container sx={{ display: { xs: "block", md: "flex" } }}>
        <Tabs
          orientation={ismediumScreenSizeAndBelow ? "horizontal" : "vertical"}
          variant={ismediumScreenSizeAndBelow ? "scrollable" : "fullWidth"}
          value={value}
          onChange={handleChange}
          allowScrollButtonsMobile
        >
          <TabCmp label="My messages" {...a11yProps(0)} />
          <TabCmp label="My postings" {...a11yProps(1)} />
          <TabCmp label="Settings" {...a11yProps(2)} />
          <TabCmp label="Create posts" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Messages />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Postings />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Settings />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <CreatePost />
        </TabPanel>
      </Container>
    </>
  );
}
