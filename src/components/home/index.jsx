import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Grid,
  Typography,
} from "@mui/material";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
  getUniqueId,
  setSessionStorage,
} from "../../util/functions";

import { DrawerContainer, TypographyCmp } from "./style";
import ForLoggedInUser from "./ForLoggedInUser";
import NotLoggedInUser from "./NotLoggedInUser";
import Header from "../navigation/header";
import { categories } from "../myAccount/createposts/listOfCategories";


export default function Body() {

  //track whether the user's location
  const [userLocation,setUserLocation] = useState(getFromSessionStorage("location",false))

 console.log("User login : ",userLocation)
  const navigate = useNavigate();

  return (
    <>
      <Header setUserLocation={setUserLocation}/>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: { md: "block", xs: "none" } }}>
          <DrawerContainer variant="permanent" anchor="left">
            <Toolbar />
            <TypographyCmp variant="h5">All categories</TypographyCmp>
            <List>
              {categories.map((category, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      navigate(`../view/category/${category.name}`)
                    }
                  >
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </DrawerContainer>
        </Box>
        { userLocation === null ? <NotLoggedInUser />: <ForLoggedInUser userLocation={userLocation}/> }
      </Box>
    </>
  );
}
