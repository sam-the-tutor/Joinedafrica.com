import { styled } from "@mui/material/styles";
import { Drawer, Typography } from "@mui/material";

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
