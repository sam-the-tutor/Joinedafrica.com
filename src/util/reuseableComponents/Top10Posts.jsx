import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import PostingCard from "./PostingCard";
import { post } from "../../declarations/post";
import Content from "../../components/home/Content";

//Posts to be displayed when the user id logged in
// export default function Top10Posts(category, location) {

//   const [results, setResults] = useState([])

//   post.locationSpecificPosts(category,location).then(values=>setResults(values.ok))

//   const myPosts = results.map((posting, index) => <Grid item xs={12} sm={4} ><PostingCard post={posting} canOnlyMeSeeThisPost={false} key={index}/></Grid>)
//  // console.log("ppoosts :",results)
//   return (
//   <Box style={{ marginTop: "20px", marginBottom: "20px" }} key={category} >
//     <Grid container spacing={{ xs: 2}} columns={{ xs: 4, sm: 2, md: 4 }}>
//       {myPosts}
//     </Grid>
//   </Box>
// );
// };

//Posts to be displayed when the user is not logged in.
// export function TopPosts(category) {

//   const [results, setResults] = useState([])

//   post.getTop10PostingsInCategory(category)
//   .then(values=>setResults(values.ok))

//   const myPosts = results.map((posting, index) => <Grid item xs={12} sm={4} ><PostingCard post={posting} canOnlyMeSeeThisPost={false} key={index}/></Grid>)
//   //console.log("ppoosts :",results)
//   return (
//   <Box style={{ marginTop: "20px", marginBottom: "20px" }} key={category} >
//     <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//       {myPosts}
//     </Grid>
//   </Box>
// );
// }

export function Top10Posts({ name, posts }) {
  return (
    <Box style={{ marginTop: "20px", marginBottom: "20px" }} key={posts}>
      <Typography style={{ marginBottom: "20px" }} variant="h6">
        {name}
      </Typography>
      <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {posts.map((posting, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <PostingCard post={posting} canOnlyMeSeeThisPost={false} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
