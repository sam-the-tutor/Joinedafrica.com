import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createObjectURLFromArrayOfBytes } from "../../../util/functions";
import Header from "../../navigation/header";
import { post } from "../../../declarations/post";
import { profile } from "../../../declarations/profile";
import { TypographyCmp, DrawerContainer } from "./style";
import { getSubcategory } from "../../myAccount/createposts/listOfCategories";
import { getFileFromPostAssetCanister } from "../../../canisters/post_assets";
import { Top10Posts } from "../../../util/reuseableComponents/Top10Posts";
import LeftBar from "./filter";
import { getErrorMessage } from "../../../util/ErrorMessages";

/**
 * When the user clicks on a specific category in the home page, this component is responsible for displaying all postings
 * in that category
 * @returns returns all postings in a selected category.
 */
export default function ViewCategory() {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(false);
  const [top10Posts, setTop10Posts] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getPostings() {
      setLoading(true);
      //joinedafrica is making the call because the method it calls is public and doesn't
      //need authorization
      const postings = await post.getTop10PostingsInCategory(categoryName);
      console.log(postings);
      if (postings?.err) {
        alert(getErrorMessage(postings.err));
      } else {
        // const nonEmptySubcategory = postings.ok.filter((posting) => {
        //   return posting.length > 0;
        // });
        setTop10Posts(postings.ok);
      }

      setLoading(false);
    }
    getPostings();
  }, []);

  return (
    <Box>
      <Header />
      <Box style={{ display: "flex", marginTop: "20px" }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <DrawerContainer variant="permanent" anchor="left">
            <Toolbar />
            <TypographyCmp variant="h6">All subcategories</TypographyCmp>
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
        </Box>

        <Box style={{ padding: "24px", width: "100%" }}>
          <Toolbar />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Button
                sx={{
                  marginBottom: "24px",
                  padding: "0",
                  display: { xs: "block", md: "none" },
                }}
                onClick={() => setMobileOpen(true)}
              >
                Choose subcategory
              </Button>
              <Typography
                style={{ color: "var(--joy-palette-neutral-200, #D8D8DF)" }}
              >
                Showing top 10 postings from {categoryName}
              </Typography>

              {top10Posts.map((post, index) => (
                <Top10Posts key={index} name={post.name} posts={post.post} />
              ))}
            </>
          )}
        </Box>
        <LeftBar
          open={mobileOpen}
          close={() => setMobileOpen(false)}
          categoryName={categoryName}
        />
      </Box>
    </Box>
  );
}
