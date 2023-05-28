import { Box, Container, Toolbar, useMediaQuery } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

import Settings from "../auth/settings";
import Header from "../navigation/header";
import CreatePost from "./createposts";
import Messages from "./messages";
import Postings from "./postings";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

/**
 * This component is reponsible for displaying all operations a logged in user can do
 */
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
  const [refreshComponent, setRefreshComponent] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header refreshComponent={refreshComponent} />
      <Toolbar style={{ marginTop: "20px" }} />
      <Container
        style={
          {
            // sx: "marginTop:400px",
          }
        }
        sx={
          ismediumScreenSizeAndBelow
            ? {}
            : {
                display: "flex",
              }
        }
      >
        <Tabs
          orientation={ismediumScreenSizeAndBelow ? "horizontal" : "vertical"}
          variant={ismediumScreenSizeAndBelow ? "scrollable" : "fullWidth"}
          value={value}
          onChange={handleChange}
          // scrollButtons
          allowScrollButtonsMobile
        >
          <Tab
            sx={{
              alignItems: "start",
              textAlign: "left",
            }}
            label="My messages"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ alignItems: "start", textAlign: "left" }}
            label="My postings"
            {...a11yProps(1)}
          />
          <Tab
            sx={{ alignItems: "start", textAlign: "left" }}
            label="Settings"
            {...a11yProps(2)}
          />
          <Tab
            sx={{ alignItems: "start", textAlign: "left" }}
            label="Create posts"
            {...a11yProps(3)}
          />
        </Tabs>
        <TabPanel value={value} index={0} style={{ width: "100%" }}>
          <Messages />
        </TabPanel>
        <TabPanel value={value} index={1} style={{ width: "100%" }}>
          {/* <MyPostings /> */}
          <Postings />
        </TabPanel>
        <TabPanel value={value} index={2} style={{ width: "100%" }}>
          <Settings
            setRefreshComponent={() => setRefreshComponent(!refreshComponent)}
          />
        </TabPanel>
        <TabPanel value={value} index={3} style={{ width: "100%" }}>
          <CreatePost />
        </TabPanel>
      </Container>
    </>
  );
}
