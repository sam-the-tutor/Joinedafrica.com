import React, { useEffect } from "react";
import { Container } from "@mui/material";
import PostFilter from "./PostFilter";
import { useParams } from "react-router-dom";
import ViewCategory from "./ViewCategory";

/**
 * When the user clicks on a category, this component is reponsible for showing ALL the postings in that category (ViewCategory)
 * and filtering for that category
 * @returns filtering and postings for a specific category
 */

export default function ViewListOfPost() {
  const { getCategoryNames, subcategoryName } = useParams();
  useEffect(() => {
    if (subcategoryName == null) {
      //get all the posts in category name -> subcategory list
    } else {
      //get all the posts in only category name
    }
  }, []);
  return (
    <Container>
      <PostFilter />
      <ViewCategory />
    </Container>
  );
}
