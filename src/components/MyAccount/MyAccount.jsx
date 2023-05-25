import { Box, Container, useMediaQuery, Toolbar } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

import Header from "../appStructure/Header";
import Settings from "../auth/Settings";
import CreatePost from "./CreatePosts";
import MyMessages from "./MyMessages";
import MyPostings from "./MyPostings";

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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
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

  // useEffect(() => {

  // }, [])

  return (
    <>
      <Header refreshComponent={refreshComponent} />
      <Toolbar style={{ marginTop: "20px" }} />
      <Container
        style={
          {
            // sx: "marginTop:400px",
            // lg: "flexGrow: 1, marginBottom: 100px, display: flex, marginTop: 100px",
          }
        }
      >
        <Tabs
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          variant={isSmallScreen ? "scrollable" : "fullWidth"}
          value={value}
          onChange={handleChange}
          // scrollButtons
          allowScrollButtonsMobile
        >
          <Tab
            sx={{ alignItems: "start", textAlign: "left" }}
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
          {/* <MyMessages /> */}1
        </TabPanel>
        <TabPanel value={value} index={1} style={{ width: "100%" }}>
          {/* <MyPostings /> */}2
        </TabPanel>
        <TabPanel value={value} index={2} style={{ width: "100%" }}>
          <Settings
            setRefreshComponent={() => setRefreshComponent(!refreshComponent)}
          />
        </TabPanel>
        <TabPanel value={value} index={3} style={{ width: "100%" }}>
          {/* <CreatePost /> */}3
        </TabPanel>
      </Container>
    </>
  );
}
