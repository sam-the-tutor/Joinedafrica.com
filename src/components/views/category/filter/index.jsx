import React from "react";
import {
  Drawer,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Button,
  Grid,
  ListItemButton,
  TextField,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DrawerContainer } from "./style";
import { getSubcategory } from "../../../myAccount/createposts/listOfCategories";

export default function LeftBar({ open, close, categoryName }) {
  const navigate = useNavigate();
  return (
    <DrawerContainer
      anchor="left"
      open={open}
      variant="temporary"
      onClose={close}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Typography variant="h6">All subcategories</Typography>
      <Divider />
      <List>
        {getSubcategory(categoryName).map((subcategory, index) => (
          <ListItem key={index}>
            <ListItemButton
              onClick={() =>
                navigate("../view/" + categoryName + "/" + subcategory)
              }
            >
              <ListItemText primary={subcategory} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerContainer>
  );
}
