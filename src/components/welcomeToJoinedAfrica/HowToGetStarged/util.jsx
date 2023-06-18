import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
  import * as React from "react";
  
  const createYourProfile = [
    "Visit the home page.",
    "On the navigation bar, locate and click the 'Create Profile' button. You will be redirected to the create profile page.",
    "Fill out all the required information.",
    "Remember to establish your unique identity!"
  ]
  
  const createYourProduct = [
    "After creating your profile, click on your profile icon.",
    "In the dropdown menu, select 'My Account.'",
    "Navigate to the 'CREATE POST' tab.",
    "Choose the appropriate category, subcategory for your product. and provide all the necessary details for your product.",
    "Finally, click the designated button to create your product."
  ]

  const advertiseYourProduct = [
    "After creating your product, navigate to the 'MY POSTINGS' tab. You will find all the products you have created listed there.",
    "Click on the three vertical icons associated with your product.",
    "Choose the option to publish your post to the marketplace.",
    "Finally, go to the homepage and click on the category you created. Your product(s) will be displayed there for buyers to see."
  ]

  function getListItems(items){
    return items.map((item, index) => (
        <ListItem key={index}>
            <ListItemIcon>
                <ArrowForwardIcon />
            </ListItemIcon>
            <ListItemText primary={item} />
        </ListItem>
    ))
  }

  export const steps = [
    {
        label: "Create your profile",
        description : <List> {getListItems(createYourProfile)}</List>
                
    },
    {
        label: "Create your product",
        description : <List>{getListItems(createYourProduct)}</List>
    },
    {
        label: "Advertise your product",
        description : <List> {getListItems(advertiseYourProduct)} </List>

    },
  ];
  