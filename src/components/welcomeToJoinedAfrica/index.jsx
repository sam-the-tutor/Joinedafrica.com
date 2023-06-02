import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Button, Typography, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Introduction } from "./style";
import HowToGetStarted from "./HowToGetStarted";
import HowWeStandOut from "./HowWeStandOut";

export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <Box>
      <Box sx={{ padding: { xs: "0 20px 50px 20px", md: "50px" } }}>
        <Introduction>
          <Box>
            <Box
              component="img"
              src="./Logo_without_background.png"
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
                Is a marketplace where Africans can buy and sell to each other
                using one currency
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box
              component="img"
              src="./Connected_Africa.png"
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
          <Box>
            <HowWeStandOut
              content="Joined Africa brings together people within the same country and across borders for seamless trade using one currency."
              imagePath="./cross_border_trade_without_background.png"
            />
          </Box>
          <Box>
            <HowWeStandOut
              content="Local markets, global reach: Sell your products to customers within your own country while also reaching a global audience, expanding your business like never before."
              imagePath="./local_market_global_reach_without_background.png"
            />
          </Box>
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
      <Box
        style={{
          backgroundColor: "white",
          height: "200px",
          padding: "50px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button sx={{ color: "black" }}>About us</Button>
          <Button sx={{ color: "black" }}>Contact us</Button>
          <Button sx={{ color: "black" }}>Privacy policy</Button>
        </Box>
        <Box>
          <Button sx={{ color: "black" }}>
            <FacebookIcon />
          </Button>
          <Button sx={{ color: "black" }}>
            <YouTubeIcon />
          </Button>
          <Button sx={{ color: "black" }}>
            <LinkedInIcon />
          </Button>
          <Button sx={{ color: "black" }}>
            <TwitterIcon />
          </Button>
          <Button sx={{ color: "black" }}>
            <InstagramIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
