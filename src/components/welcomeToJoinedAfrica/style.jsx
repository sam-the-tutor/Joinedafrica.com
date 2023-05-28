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
  justifyContent: "space-between",
  padding: "50px",
});
export const HowWeStandOutContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
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
  backgroundColor: "white",
  color: "black",
  padding: "50px",
});
export const MessageFromFounder = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});
