import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import * as React from "react";

const steps = [
  {
    label: "Create your profile",
    description: `In order to create a post or message people, you have to first create a profile. This can be when you are on the home page and 
    at the navigation bar, click on the create profile button, You'll be taken to the create profile page. Fill out all the information.
    Don't forget to set up your identity!`,
    imgSrc: "./create_profile.png",
  },
  {
    label: "Create a post",
    description: `After creating your profile, click on "My Account" in the dropdown in your profile icon. 
      Click on the "CREATE POSTS" tab and select the category and subcategory of your post. Fill out the other
      details required for the post and then create the post by clicking on the button`,
    imgSrc: "./create_post.jpeg",
  },
  {
    label: "Publish your post",
    description: `After creating the post, click on the "MY POSTINGS" tab to see all the posts you have created.
    Click on the 3 vertical icons and publish your post to the marketplace! Go to the homepage, click on the 
    category you created and you will see your posts there.`,
    imgSrc: "./publish_post.jpeg",
  },
];

export default function HowToGetStarted() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography style={{ color: "#d8d8df" }}>
                {step.description}
              </Typography>
              <img
                src={step.imgSrc}
                style={{
                  width: "100%",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              />
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Box style={{ marginTop: "30px", color: "white" }}>
          <Typography>
            All steps completed. You are ready to now market your products!
          </Typography>
          <Button
            onClick={handleReset}
            sx={{ mt: 1, mr: 1 }}
            variant="outlined"
          >
            Reset
          </Button>
        </Box>
      )}
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
  );
}
