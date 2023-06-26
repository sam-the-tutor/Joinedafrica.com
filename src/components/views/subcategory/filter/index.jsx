import { PropTypes } from "prop-types";
import React from "react";
import { Button } from "@mui/material";
import { getFilterForSubcategory } from "../../../myAccount/createposts/util/postFiltering";
import { BoxCmp, DrawerContainer, TypographyCmp } from "./style";

export default function FilterPost({
  subcategoryName,
  filterPosts,
  setFilterOptions,
  open,
  close,
}) {
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
      <TypographyCmp variant="h6">Filter posts</TypographyCmp>
      <BoxCmp>
        {getFilterForSubcategory(subcategoryName, setFilterOptions)}
        <Button variant="outlined" onClick={() => filterPosts()}>
          Filter Posts
        </Button>
      </BoxCmp>
    </DrawerContainer>
  );
}

FilterPost.propTypes = {
  subcategoryName: PropTypes.string,
  setFilterOptions: PropTypes.func,
  filterPosts: PropTypes.func,
  open: PropTypes.bool,
  close: PropTypes.func,
};
