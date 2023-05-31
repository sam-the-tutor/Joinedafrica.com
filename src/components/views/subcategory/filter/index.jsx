import React from "react";
import { DrawerContainer, TypographyCmp } from "./style";
import { getFilterForSubcategory } from "../../../myAccount/createposts/util/postFiltering";

export default function FilterPost({
  subcategoryName,
  categoryName,
  posts,
  setPosts,
  setLoading,
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
      <div
        style={{
          paddingBottom: "30px",
          paddingLeft: "15px",
        }}
      >
        {getFilterForSubcategory(
          subcategoryName,
          categoryName,
          posts,
          setPosts,
          setLoading
        )}
      </div>
    </DrawerContainer>
  );
}
