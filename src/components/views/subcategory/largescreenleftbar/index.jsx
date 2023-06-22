import { Box, Toolbar } from "@mui/material";
import { PropTypes } from "prop-types";

import { BoxCmp, DrawerContainer, TypographyCmp } from "./style";

export default function LargeScreenLeftBar({
  getFilterForSubcategory,
  subcategoryName,
}) {
  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <DrawerContainer variant="permanent" anchor="left">
        <Toolbar />
        <TypographyCmp variant="h6">Filte postsr</TypographyCmp>
        <BoxCmp>{getFilterForSubcategory(subcategoryName)}</BoxCmp>
      </DrawerContainer>
    </Box>
  );
}

LargeScreenLeftBar.propTypes = {
  getFilterForSubcategory: PropTypes.func,
  subcategoryName: PropTypes.string,
};
