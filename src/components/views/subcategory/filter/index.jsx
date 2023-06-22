import { PropTypes } from "prop-types";
import React from "react";

import { getFilterForSubcategory } from "../../../myAccount/createposts/util/postFiltering";
import { BoxCmp, DrawerContainer, TypographyCmp } from "./style";

export default function FilterPost({
  subcategoryName,
  // categoryName,
  // posts,
  // setPosts,
  // setLoading,
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
        {getFilterForSubcategory(
          subcategoryName
          // categoryName,
          // posts,
          // setPosts,
          // setLoading
        )}
      </BoxCmp>
    </DrawerContainer>
  );
}

FilterPost.propTypes = {
  subcategoryName: PropTypes.string,
  // categoryName: PropTypes.string,
  // posts: PropTypes.array,
  // setPosts: PropTypes.func,
  // setLoading: PropTypes.func,
  open: PropTypes.bool,
  close: PropTypes.func,
};
