import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  ListItemIcon,
} from "@mui/material";
// import { Link } from "react-router-dom";
import { categories } from "../../util/ListOfCategories";
import {
  DrawerContainer,
  TypographyCmp,
} from "../../styling/appStructure/LeftBar";
import { useNavigate } from "react-router-dom";

export default function LeftBar() {
  const navigate = useNavigate();
  return (
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
  );
}
