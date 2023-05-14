import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import HowWeStandOut from "./HowWeStandOut";
import { Link } from "react-router-dom";
import {
  MainContent,
  OurVision,
  MessageFromFounder,
  Greeting,
  Introduction,
} from "../../styling/WelcomeToJoinedAfrica";
import HowToGetStarted from "./HowToGetStarted";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
export default function WelcomePage() {
  return (
    <Box>
      <Greeting>
        <Typography variant="h6">Welcome to Joined Africa!</Typography>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button variant="contained">Visit site</Button>
        </Link>
      </Greeting>
      <Introduction>
        <Box>
          <Box
            component="img"
            src="./Logo_without_background.png"
            alt="Joined Africa logo"
          />
          <Box>
            <Typography variant="h1" sx={{ fontWeight: "bold" }}>
              Joined Africa
            </Typography>
            <Typography style={{ color: "#d8d8df" }}>
              Is a marketplace where Africans can buy and sell to each other
              using one currency
            </Typography>
          </Box>
        </Box>
        <Box
          component="img"
          src="./Connected_Africa.png"
          alt="Connected Africa"
        />
      </Introduction>
      <Box>
        <Box
          style={{ backgroundColor: "white", color: "black", padding: "50px" }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textDecoration: "underline", textAlign: "center" }}
          >
            How we stand out
          </Typography>
          <Box>
            <HowWeStandOut
              content="You can now market your product(s) to global and local customers using one currency - USDT (Tether)"
              imagePath="./Tether_USDT.png"
            />
          </Box>
        </Box>

        <Box
          style={{
            backgroundColor: "black",
            padding: "50px",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textDecoration: "underline",
              textAlign: "center",
              color: "white",
            }}
          >
            How to get started!
          </Typography>
          <HowToGetStarted />
        </Box>
        {/* we'll add customer feedback out or platform here when we have one */}
        <OurVision>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textDecoration: "underline", textAlign: "center" }}
          >
            Our Vision
          </Typography>
          <MessageFromFounder>
            <Box>
              <Typography gutterBottom sx={{ width: "500px" }}>
                The vision of Joined Africa is to connect all africans in buying
                and selling under a single currency{" "}
              </Typography>
              <Typography
                gutterBottom
                sx={{ width: "500px", marginTop: "20px", marginBottom: "20px" }}
              >
                We use bitcoin as our form of currency because it's a digital
                currency all Africans can have and use.
              </Typography>
              <Typography>Mena Agina - Founder</Typography>
            </Box>
            <Box component="img" src="./bitcoin_payment_transaction.png" />
          </MessageFromFounder>
        </OurVision>

        {/* <Container>
          <Button sx={{ color: "black" }}>About us</Button>
        </Container> */}
      </Box>
      <Box
        style={{
          backgroundColor: "black",
          height: "200px",
          padding: "50px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button sx={{ color: "white" }}>About us</Button>
          <Button sx={{ color: "white" }}>Contact us</Button>
          <Button sx={{ color: "white" }}>Privacy policy</Button>
        </Box>
        <Box>
          <Button sx={{ color: "white" }}>
            <FacebookIcon />
          </Button>
          <Button sx={{ color: "white" }}>
            <YouTubeIcon />
          </Button>
          <Button sx={{ color: "white" }}>
            <LinkedInIcon />
          </Button>
          <Button sx={{ color: "white" }}>
            <TwitterIcon />
          </Button>
          <Button sx={{ color: "white" }}>
            <InstagramIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
