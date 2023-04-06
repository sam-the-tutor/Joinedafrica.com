import React from "react";
import { Container, Box, Typography, Button, Stack } from "@mui/material";
import HowWeStandOut from "./HowWeStandOut";
import { Link } from "react-router-dom";
import {
  MainContent,
  OurVision,
  MessageFromFounder,
  Greeting,
  Introduction,
} from "../../styling/WelcomeToJoinedAfrica";

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
            <Typography>
              Is a marketplace where Africans can buy and sell to each other
              under a single currency
            </Typography>
          </Box>
        </Box>
        <Box
          component="img"
          src="./Connected_Africa.png"
          alt="Connected Africa"
        />
      </Introduction>
      <MainContent>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textDecoration: "underline", textAlign: "center" }}
        >
          How we stand out
        </Typography>
        <Stack spacing={5}>
          <HowWeStandOut
            title="Bitcoin is our form of payment"
            content="Bitcoin is a digital currency that allows people to make payments directly to each other through an online system."
            imagePath="./bitcoin.png"
          />
          <HowWeStandOut
            title="Secure transactions"
            content="We use blockchain technology that follows the principles of cryptography and decentralization 
          and consensus with ensures trusts in transactions"
            imagePath="./secure_transactions.png"
          />
          <HowWeStandOut
            title="Authenticate using Internet identity"
            content="Internet identity allows you to log in securely and annoymously using fingerprint sensor on a laptop, the face ID system on a phone, or a portable HSM. You don't need a username and password to Log in! "
            imagePath="./Internet_identity.png"
          />
        </Stack>
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
        <Container>
          <Button sx={{ color: "black" }}>About us</Button>
        </Container>
      </MainContent>
    </Box>
  );
}
