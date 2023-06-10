import React from "react";
import { Typography, Box } from "@mui/material";
import { team } from "./team";
team;
export default function Aboutus() {
  return (
    <Box>
      <Box style={{ margin: "20px" }}>
        <Typography style={{ textAlign: "center" }} variant="h3">
          Welcome to Joined Africa
        </Typography>
      </Box>

      <Box>
        <Box style={{ margin: "20px" }}>
          <Typography>
            Joined Africa is a visionary online marketplace founded by Mena
            Agina, with a mission to connect all Africans in e-commerce under a
            single currency.
          </Typography>
        </Box>
        <Box style={{ margin: "20px" }}>
          <Typography>
            Our platform is designed to empower individuals across the continent
            to buy and sell with ease, breaking down barriers of currency
            exchange and fostering a united African trading community.
          </Typography>
        </Box>
        <Box style={{ margin: "20px" }}>
          <Typography>
            Mena Agina, a proud Nigerian native, envisioned a platform where
            Africans could freely engage in commerce with fellow Africans from
            different countries, eliminating currency issues and promoting
            economic growth.
          </Typography>
        </Box>
        <Box style={{ margin: "20px" }}>
          <Typography>
            At Joined Africa, we aim to create a future where Africa is joined
            again, under one currency, enabling seamless trade and prosperity
            among African nations.
          </Typography>
        </Box>
        <Box style={{ margin: "20px" }}>
          <Typography>
            Our online marketplace allows Africans to showcase their products
            through images, giving interested buyers the opportunity to connect
            directly with sellers for their desired items.
          </Typography>
        </Box>
        <Box style={{ margin: "20px" }}>
          <Typography>
            We value your feedback and suggestions as we strive to improve the
            platform continually. If you have any questions, concerns, or ideas
            for site enhancements, please email us at joinedafrica.com.
          </Typography>
        </Box>
        <Box style={{ margin: "20px" }}>
          <Typography>
            Join the movement today and help us spread the word! Invite your
            friends, family, and neighbors to list and find items, and let's
            build a thriving trading community within Africa.
          </Typography>
        </Box>
        <Box style={{ margin: "20px" }}>
          <Typography>
            Together, let's make Africa joined again, shaping a vibrant future
            of unity, prosperity, and boundless opportunities.
          </Typography>
        </Box>
        <Box style={{ margin: "20px" }}>
          <Typography>Sincerely,</Typography>
        </Box>
        <Box style={{ margin: "20px" }}>
          Mena Agina, <b>Founder</b>
        </Box>
      </Box>

      <Box style={{ marginBottom:"40px", marginLeft:"20px", marginRight:"20px" }}>
        <Typography style={{ textAlign: "center", marginBottom:"20px" }} variant="h4">
          Creators
        </Typography>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {team.map((member, index) => (
            <Box key={index}>
              <img
                src={member.image}
                style={{
                  width: "150px",
                  objectFit: "cover",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
              <Typography>{member.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
