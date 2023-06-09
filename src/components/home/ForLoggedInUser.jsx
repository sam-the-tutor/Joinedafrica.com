import React from "react";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import Content from "./Content";
import { categories } from "../myAccount/createposts/listOfCategories"
import Top10Posts  from "../../util/reuseableComponents/Top10Posts"

export default function ForLoggedInUser({userLocation}) {

  return (
    <Box style={{ margin: "10px", padding: "4px", width:"100%" } } >
    <Toolbar />
    <Typography sx={{textAlign:"center",background: "White", color: "black"}} >Trending in Your Local Area</Typography>
    <Box style={{ margin: "10px", padding: "4px" } }>
  {
  categories.map(cat =>{
  return(
  <Grid container   >
  <Typography sx={{backgroundColor: "brown"}}>{cat.name}</Typography>
  <Grid container   >
    {Top10Posts(cat.name, userLocation)}
  </Grid>
  </Grid>
  )})
  }
  </Box>
  </Box> 
  );
}

