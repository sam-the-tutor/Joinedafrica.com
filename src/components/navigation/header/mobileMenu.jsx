import { Button, Menu, MenuItem } from "@mui/material";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

export default function MobileMenu({
  mobileMoreAnchorEl,
  setMobileMoreAnchorEl,
  internet_identity,
  setPrincipal,
}) {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={() => setMobileMoreAnchorEl(null)}
    >
      <div>
        <MenuItem>
          <Link to="/create-profile">
            <Button>Create Profile</Button>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link>
            <Button onClick={async () => await internet_identity(setPrincipal)}>
              Log in
            </Button>
          </Link>
        </MenuItem>
      </div>
    </Menu>
  );
}

MobileMenu.propTypes = {
  setPrincipal: PropTypes.func,
  mobileMoreAnchorEl: PropTypes.object,
  setMobileMoreAnchorEl: PropTypes.func,
  internet_identity: PropTypes.func,
};
