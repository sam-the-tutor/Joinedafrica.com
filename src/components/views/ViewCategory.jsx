import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { joinedafrica } from "../../declarations/joinedafrica";
import { useParams } from "react-router-dom";
import { getSubcategory } from "../../util/ListOfCategories";
import Header from "../appStructure/Header";
import {
  DrawerContainer,
  TypographyCmp,
} from "../../styling/appStructure/LeftBar";
import Top10Posts from "./Top10Posts";
import { getFileFromPostAssetCanister } from "../../util/postAssetCanisterFunctions";
import { createObjectURLFromArrayOfBytes } from "../../util/functions";
import { useNavigate } from "react-router-dom";
/**
 * When the user clicks on a specific category in the home page, this component is responsible for displaying all postings
 * in that category
 * @returns returns all postings in a selected category.
 */
export default function ViewCategory() {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(false);
  const [top10Posts, setTop10Posts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getPostings() {
      setLoading(true);
      //joinedafrica is making the call because the method it calls is public and doesn't
      //need authorization
      const postings = await joinedafrica.getTop10SubcategoryPostingsInCategory(
        categoryName
      );
      const nonEmptySubcategory = postings.ok.filter(
        (posting) => posting.post.length > 0
      );
      const top10Subategories = [];

      //Looping through each subcategory and adding the profile picture of each posts createor in
      //the top10Subcategories list

      await Promise.all(
        nonEmptySubcategory.map(async (posting) => {
          const subcatgory = [];
          await Promise.all(
            posting.post.map(async (createdPost) => {
              const creatorOfPost = await joinedafrica.getUserProfilePicture(
                createdPost.creatorOfPostId
              );
              console.log(creatorOfPost);
              const iamgeFile = await getFileFromPostAssetCanister(
                creatorOfPost.ok.profilePicture
              );
              subcatgory.push({
                ...createdPost,
                creatorProfilePicture: createObjectURLFromArrayOfBytes(
                  iamgeFile._content
                ),
              });
            })
          );

          top10Subategories.push({
            subCategoryName: posting.subCategoryName,
            post: subcatgory,
          });
        })
      );
      setTop10Posts(top10Subategories);
      setLoading(false);
    }
    getPostings();
  }, []);
  return (
    <Box>
      <Header />
      <Box style={{ display: "flex" }}>
        <DrawerContainer variant="permanent" anchor="left">
          <Toolbar />
          <TypographyCmp variant="h6">Choose subcategory</TypographyCmp>
          <List>
            {getSubcategory(categoryName).map((subcategory, index) => (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => navigate("../view/subcategory/" + subcategory)}
                >
                  <ListItemText primary={subcategory} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DrawerContainer>
        <Box style={{ padding: "24px", width: "100%" }}>
          <Toolbar />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Typography>
                Showing top 10 postings from {categoryName}
              </Typography>
              {top10Posts.map((post, index) => (
                <Top10Posts
                  key={index}
                  name={post.subCategoryName}
                  posts={post.post}
                />
              ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
