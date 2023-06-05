import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import PostingCard from "./PostingCard";
import { post } from "../../declarations/post"
import Content from "../../components/home/Content"

/**
 * This component is reponsible for displaying the top10 posts in the homepage and category page of a post
 */


export default function Top10Posts(category, location) {

  const [results, setResults] = useState([])

  post.myFunc1(category,location).then(values=>setResults(values.ok))

  const myPosts = results.map((posting, index) => <Grid item xs={12} sm={4} ><PostingCard post={posting} canOnlyMeSeeThisPost={false} key={index}/></Grid>)
  console.log("ppoosts :",results)
  return (
  <Box style={{ marginTop: "20px", marginBottom: "20px" }} key={category} >
    <Grid container spacing={{ xs: 2}} columns={{ xs: 4, sm: 2, md: 4 }}>
      {myPosts}
    </Grid>
  </Box>
);
}


export function TopPosts(category) {

  const [results, setResults] = useState([])

  post.getTop10PostingsInCategory(category)
  .then(values=>setResults(values.ok)
  )
  //console.log("2nd results :",results)
  const myPosts = results.map((posting, index) => <Grid item><Content post={posting} key={index}/></Grid>)
 
  return (
    <Grid>
      {myPosts}
      </Grid>
);
}

