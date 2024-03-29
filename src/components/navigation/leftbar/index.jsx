import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../myAccount/createposts/listOfCategories";
import { DrawerContainer } from "./style";

export default function LeftBar({ open, close }) {
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
      <Button onClick={close}>
        <ArrowBackIosIcon />
        Go Back
      </Button>

      <img
        src="../../logo/Logo_without_background.png"
        style={{ width: "30%" }}
      />
      <Typography variant="h5">All categories</Typography>

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
