import { styled } from "@mui/material/styles";
import {  Box, Button, Grid } from "@mui/material";

export const BoxCmp = styled(Box)({
    height: "400px", overflowY: "auto"
});
export const ButtonCmp = styled(Button)({
    marginBottom: "10px", marginTop: "10px"
})
export const GridCmp = styled(Grid)({
    height: "500px",
    position: "relative",
})