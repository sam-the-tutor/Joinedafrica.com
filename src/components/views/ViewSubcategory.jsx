import React, { useState } from "react";
import { Box, List, Toolbar, Typography, Container } from "@mui/material";
import Header from "../appStructure/Header";
import {
  DrawerContainer,
  TypographyCmp,
} from "../../styling/appStructure/LeftBar";
import { useParams } from "react-router-dom";
import { getFilterForSubcategory } from "../../util/posts/PostFiltering";

export default function ViewSubcategory() {
  const [loading, setLoading] = useState(false);
  const { subcategoryName } = useParams();
  return (
    <Box>
      <Header />
      <Box style={{ display: "flex" }}>
        <DrawerContainer variant="permanent" anchor="left">
          <Toolbar />
          <TypographyCmp variant="h6">Filter</TypographyCmp>
          {getFilterForSubcategory(subcategoryName)}
        </DrawerContainer>
        <Box style={{ padding: "24px", width: "100%" }}>
          <Toolbar />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Typography>{subcategoryName} Results</Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
