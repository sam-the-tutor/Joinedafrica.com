import { styled } from "@mui/material/styles";
import { Drawer, Typography, Box } from "@mui/material";

export const DrawerContainer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    backgroundColor: "black",
    textAlign: "center",
    padding: "50px 10px",
  },
});
export const TypographyCmp = styled(Typography)({
  marginTop: "50px",
  marginBottom: "20px",
  textAlign: "center",
});

export const BoxCmp = styled(Box)({
  paddingBottom: "30px",
  paddingLeft: "15px",
});
