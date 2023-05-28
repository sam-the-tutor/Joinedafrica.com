import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  DrawerContainer,
  TypographyCmp,
} from "../../styling/appStructure/LeftBar";
import { categories } from "../../util/ListOfCategories";
import Feed from "./Feed";
import Header from "../navigation/header";

export default function Body() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <DrawerContainer variant="permanent" anchor="left">
          <Toolbar />
          <TypographyCmp variant="h5">All categories</TypographyCmp>
          <List>
            {categories.map((category, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => navigate(`../view/category/${category.name}`)}
                >
                  <ListItemIcon>{category.icon}</ListItemIcon>
                  <ListItemText primary={category.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DrawerContainer>
        <Feed />
      </Box>
    </>
  );
}
