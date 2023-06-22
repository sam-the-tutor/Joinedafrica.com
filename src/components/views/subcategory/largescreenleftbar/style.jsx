import { styled } from "@mui/material/styles";
import { Drawer, Typography, Box } from "@mui/material";

const drawerWidth = 300;
export const DrawerContainer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
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
