import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { post } from "../../declarations/post";
import { getErrorMessage } from "../../util/ErrorMessages";
import { Top10Posts } from "../../util/reuseableComponents/Top10Posts";
import { categories } from "../myAccount/createposts/listOfCategories";
import { DrawerContainer, TypographyCmp, BoxCmp } from "./style";

export default function Body() {
  const [top10Posts, setTop10Posts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      setLoading(true);
      const postsInHomepage = await post.getTop10PostingsInHomepage();
      if (postsInHomepage?.err) {
        alert(getErrorMessage(postsInHomepage.err));
      } else setTop10Posts(postsInHomepage.ok);
      setLoading(false);
    }
    init();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: { md: "block", xs: "none" } }}>
          <DrawerContainer variant="permanent" anchor="left">
            <Toolbar />
            <TypographyCmp variant="h5">All categories</TypographyCmp>
            <List>
              {categories.map((category, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      navigate(`../view/category/${category.name}`)
                    }
                  >
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </DrawerContainer>
        </Box>
        <BoxCmp>
          <Toolbar />
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            top10Posts.map((post, index) => (
              <Top10Posts key={index} name={post.name} posts={post.post} />
            ))
          )}
        </BoxCmp>
      </Box>
    </>
  );
}
