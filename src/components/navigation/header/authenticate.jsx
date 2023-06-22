import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Grid, IconButton } from "@mui/material";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

export default function Authenticate({
  setMobileMoreAnchorEl,
  internet_identity,
  setPrincipal,
}) {
  return (
    <Grid item container spacing={2}>
      <Grid item sx={{ display: { xs: "block", md: "none" } }}>
        <IconButton onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}>
          <MoreIcon />
        </IconButton>
      </Grid>

      <Grid item sx={{ display: { md: "block", xs: "none" } }}>
        <Link to="/create-profile" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Create Profile</Button>
        </Link>
      </Grid>
      <Grid item sx={{ display: { md: "block", xs: "none" } }}>
        <Link style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            onClick={async () => await internet_identity(setPrincipal)}
          >
            Log in
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

Authenticate.propTypes = {
  setPrincipal: PropTypes.func,
  setMobileMoreAnchorEl: PropTypes.func,
  internet_identity: PropTypes.func,
};
