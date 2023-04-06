import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Greeting = styled(Box)({
  backgroundColor: "white",
  color: "black",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "60px",
});

export const Introduction = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  height: "700px",
  alignItems: "center",
});
export const HowWeStandOutContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});
export const ImageCmp = styled(Box)({
  width: "500px",
  height: "400px",
  objectFit: "contain",
});
export const MainContent = styled(Box)({
  background: "white",
  color: "black",
  paddingTop: "50px",
  paddingBottom: "50px",
});
export const OurVision = styled(Box)({
  backgroundColor: "black",
  color: "white",
  paddingTop: "50px",
  paddingBottom: "50px",
  height: "600px",
});
export const MessageFromFounder = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});
