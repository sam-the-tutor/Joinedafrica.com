import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";

import { getSubcategory } from "../../../myAccount/createposts/listOfCategories";
import { DrawerContainer } from "./style";

export default function MobileLeftBar({ open, close, categoryName }) {
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

MobileLeftBar.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  categoryName: PropTypes.string,
};
