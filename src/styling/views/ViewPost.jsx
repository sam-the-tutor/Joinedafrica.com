import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const MessageCmp = styled(Box)({
  width: "300px",
  display: "flex",
  flexDirection: "column",
  JustifyContent: "center",
  ".MuiFormControl-root": {
    width: "100%",
  },
});
