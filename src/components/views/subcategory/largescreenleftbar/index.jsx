import { Box, Button, Toolbar } from "@mui/material";
import { PropTypes } from "prop-types";

import { getFilterForSubcategory } from "../../../myAccount/createposts/util/postFiltering";
import { BoxCmp, DrawerContainer, TypographyCmp } from "./style";

export default function LargeScreenLeftBar({
  subcategoryName,
  setFilterOptions,
  filterPosts,
}) {
  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <DrawerContainer variant="permanent" anchor="left">
        <Toolbar />
        <TypographyCmp variant="h6">Filte postsr</TypographyCmp>
        <BoxCmp>
          {getFilterForSubcategory(subcategoryName, setFilterOptions)}
          <Button variant="outlined" onClick={() => filterPosts()}>
            Filter Posts
          </Button>
        </BoxCmp>
      </DrawerContainer>
    </Box>
  );
}

LargeScreenLeftBar.propTypes = {
  subcategoryName: PropTypes.string,
  setFilterOptions: PropTypes.func,
  filterPosts: PropTypes.func,
};
