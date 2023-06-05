import React from "react";
import { Box, Typography, Toolbar, Grid } from "@mui/material";
import Content from "./Content";
import { categories } from "../myAccount/createposts/listOfCategories"
import {TopPosts}  from "../../util/reuseableComponents/Top10Posts"

export default function Feed() {

  return (
    <Box sx={{mt:"100px"}}>
    
    <Typography sx={{textAlign:"center",background: "White", color: "black"}} >Latest</Typography>
    <Box style={{ margin: "10px", padding: "4px",display:"flex" }}>
  {
  categories.map(cat =>{
  return(

  <Grid>

  <Typography sx={{backgroundColor: "brown"}}>{cat.name}</Typography>
  
    {TopPosts(cat.name)}
  </Grid>
  )})
  }
  </Box>
  </Box> 
  );
}

