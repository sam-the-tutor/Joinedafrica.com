import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import HowToGetStarted from "./HowToGetStarged";
import WhoWeAre from "./WhoWeAre";
import { FooterCmp, Introduction, LinkCmp } from "./style";

export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <Box>
      <Box sx={{ padding: { xs: "0 20px 50px 20px", md: "50px" } }}>
        <Introduction>
          <Box>
            <Box
              component="img"
              src="./logo/Logo_without_background.png"
              alt="Joined Africa logo"
              sx={{ width: { xs: "100px", sm: "150px", md: "200px" } }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "50px", sm: "80px", md: "96px" },
                }}
              >
                Joined Africa
              </Typography>
              <Typography
                sx={{
                  color: "#d8d8df",
                  margin: { xs: "20px 0", md: "initial" },
                }}
              >
                Joined Africa is marketplace where sellers advertise products in
                crypto currency, connecting buyers directly with sellers within
                Africa.
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box
              component="img"
              src="./welcomepage/Connected_Africa.png"
              alt="Connected Africa"
              sx={{
                display: { xs: "none", md: "block" },
              }}
            />
          </Box>
        </Introduction>
        <Box style={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("./home")}
          >
            Visit site
          </Button>
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            backgroundColor: "white",
            color: "black",
            padding: { md: "50px", xs: "30px 20px" },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textDecoration: "underline",
              textAlign: "center",
              fontSize: { xs: "24px", md: "34px" },
              marginBottom: { xs: "20px", md: "initial" },
            }}
          >
            Who we are
          </Typography>

          <WhoWeAre
            content={
              <p>
                We <b style={{ textDecoration: "underline" }}>connect</b>{" "}
                sellers and buyers locally and globally, empowering sellers to
                advertise products, connect with buyers, and expand their reach.
              </p>
            }
            imagePath="./welcomepage/local_market_global_reach_without_background.png"
          />
          <WhoWeAre
            content={
              <p>
                We <b style={{ textDecoration: "underline" }}>empower</b>{" "}
                sellers to showcase their products through images. Simply take a
                photo of the item you want to sell and advertise it on Joined
                Africa.
              </p>
            }
            imagePath="./welcomepage/take_a_photo.jpg"
          />
          <WhoWeAre
            content={
              <p>
                We <b style={{ textDecoration: "underline" }}>create</b> more
                opportunities by bringing together buyers and sellers on Joined
                Africa. With our built-in messaging application.
              </p>
            }
            imagePath="./welcomepage/buyer_and_seller_chatting.jpg"
          />
        </Box>

        <Box
          sx={{
            backgroundColor: "black",
            padding: { xs: "30px 20px", md: "50px" },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textDecoration: "underline",
              textAlign: "center",
              color: "white",
              fontSize: { xs: "24px", md: "34px" },
              marginBottom: { xs: "20px", md: "initial" },
            }}
          >
            Let's get started!
          </Typography>
          <HowToGetStarted />
        </Box>
      </Box>
      <FooterCmp>
        <Box>
          <Button sx={{ color: "black" }} onClick={() => navigate("./aboutus")}>
            About us
          </Button>
          <Button sx={{ color: "black" }} onClick={() => navigate("./faq")}>
            FAQs
          </Button>
          <Button
            sx={{ color: "black" }}
            onClick={() => navigate("./contactus")}
          >
            Contact us
          </Button>
        </Box>
        <Box>
          <LinkCmp href="https://www.linkedin.com/company/joinedafrica/">
            <LinkedInIcon />
          </LinkCmp>
          <LinkCmp href="https://www.instagram.com/joinedafrica/">
            <InstagramIcon />
          </LinkCmp>
          <LinkCmp href="https://www.facebook.com/JoinedAfrica">
            <FacebookIcon />
          </LinkCmp>
          <LinkCmp href="https://www.youtube.com/@JoinedAfrica/">
            <YouTubeIcon />
          </LinkCmp>
        </Box>
      </FooterCmp>
    </Box>
  );
}
