import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as React from "react";

import { steps } from "./util";

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
              {step.description}
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
