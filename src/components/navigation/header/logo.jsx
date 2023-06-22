import MenuIcon from "@mui/icons-material/Menu";
import { Grid, IconButton, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Logo({ setMobileOpen }) {
  const navigate = useNavigate();
  return (
    <Grid item display="flex" alignItems="center">
      <Grid item>
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Grid>
      <Grid item display="flex" sx={{ cursor: "pointer" }}>
        <Typography variant="h6" onClick={() => navigate("../home")}>
          Joined Africa
        </Typography>
      </Grid>
      <Grid item sx={{ display: { xs: "none", md: "block" } }}>
        <img
          src="/logo/Logo_without_background.png"
          style={{ width: "80px" }}
        />
      </Grid>
    </Grid>
  );
}

Logo.propTypes = {
  setMobileOpen: PropTypes.func,
};
