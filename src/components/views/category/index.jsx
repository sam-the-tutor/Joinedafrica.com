import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { post } from "../../../declarations/post";
import { getErrorMessage } from "../../../util/ErrorMessages";
import { Top10Posts } from "../../../util/reuseableComponents/Top10Posts";
import { getSubcategory } from "../../myAccount/createposts/listOfCategories";
import MobileLeftBar from "./filter";
import { BoxContainer, DrawerContainer, Feed, TypographyCmp } from "./style";

export default function ViewCategory() {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(false);
  const [top10Posts, setTop10Posts] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function getPostings() {
      setLoading(true);
      const postings = await post.getTop10PostingsInCategory(categoryName);
      console.log(postings);
      if (postings?.err) {
        alert(getErrorMessage(postings.err));
      } else {
        setTop10Posts(postings.ok);
      }
      setLoading(false);
    }
    getPostings();
  }, []);

  return (
    <Box>
      <BoxContainer>
        <LargeScreenLeftBar
          getSubcategory={getSubcategory}
          categoryName={categoryName}
        />
        <ViewFeed
          loading={loading}
          top10Posts={top10Posts}
          categoryName={categoryName}
          setMobileOpen={setMobileOpen}
        />
        <MobileLeftBar
          open={mobileOpen}
          close={() => setMobileOpen(false)}
          categoryName={categoryName}
        />
      </BoxContainer>
    </Box>
  );
}

function LargeScreenLeftBar({ getSubcategory, categoryName }) {
  const navigate = useNavigate();
  return (
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
  );
}

function ViewFeed({ loading, top10Posts, categoryName, setMobileOpen }) {
  return (
    <Feed>
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
    </Feed>
  );
}

LargeScreenLeftBar.propTypes = {
  getSubcategory: PropTypes.func,
  categoryName: PropTypes.string,
};

ViewFeed.propTypes = {
  loading: PropTypes.bool,
  top10Posts: PropTypes.array,
  categoryName: PropTypes.string,
  setMobileOpen: PropTypes.func,
};
