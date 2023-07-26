import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";

import { BoxCmp, TypographyCmp } from "./style";
import { team } from "./team";
import WhyJoinedAfrica from "./whyJoinedAfrica";

export default function Aboutus() {
  return (
    <Box>
      <Toolbar />
      <Box style={{ margin: "40px 20px" }}>
        <Box>
          <TypographyCmp variant="h4">About us</TypographyCmp>
          <Typography>
            At Joined Africa, we are dedicated to providing a seamless online
            marketplace that connects sellers and buyers, locally and globally
            within Africa. Our platform empowers sellers to advertise their
            products, expand their reach, and effortlessly connect with
            potential buyers. Meanwhile, buyers can explore a wide range of
            categories, including properties, electronics, fashion, vehicles,
            and more
          </Typography>
          <Typography sx={{ mt: "25px", mb: "25px" }}>
            Creating a post to sell your item is quick and easy. Once you've
            chosen the relevant category, such as vehicles, our system guides
            you to select a specific subcategory, such as buses, cars, or
            trucks. You can then capture an image of your product, assign it a
            crypto-price, and provide a description. After completing the form,
            you can create and publish your post for the entire marketplace to
            see.
          </Typography>
          <Typography>
            Communication between buyers and sellers is essential, and we've
            made it convenient through our built-in messaging application. When
            a seller lists a product on our site, interested buyers can contact
            them directly using our chat application.
          </Typography>
          <Typography sx={{ mt: "25px", mb: "25px" }}>
            Whether you're a seller looking to showcase your products or a buyer
            searching for unique items, our platform is designed to connect you,
            expand your opportunities. Start by taking a photo of the item you
            want to sell, create your post, and embark on your journey with us.
          </Typography>
        </Box>
        <Box>
          <TypographyCmp variant="h4">Why Joined Africa</TypographyCmp>
          <WhyJoinedAfrica />
        </Box>
        <TypographyCmp variant="h4">Meet the team</TypographyCmp>
        <BoxCmp>
          {team.map((member, index) => (
            <Box key={index}>
              <img src={member.image} style={member.style} />
              <Typography>{member.name}</Typography>
              <Typography>{member.role}</Typography>
            </Box>
          ))}
        </BoxCmp>
      </Box>
    </Box>
  );
}
