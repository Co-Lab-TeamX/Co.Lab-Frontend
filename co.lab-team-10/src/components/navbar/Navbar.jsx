import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const pages = ["About", "Help", "Signin", "Signout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  return (
    <AppBar position="static" elevation={0}>
      <div className="container">
        <Toolbar disableGutters className="logo-and-name">
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <GiHamburgerMenu className="hamburger-menu" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography className="pin">
            <MdLocationOn />
          </Typography>
          <Typography
            className="logo-and-name"
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: "poppins",
              fontWeight: 700,
              color: "#455a64",
              textDecoration: "none",
            }}
            onClick={(e) => navigate("/")}
          >
            Free
            <Typography className="up">Up</Typography>
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className="pages"
          >
            <MenuItem className="nav-link" onClick={(e) => navigate("/")}>
              About
            </MenuItem>
            <MenuItem className="nav-link">Help</MenuItem>
            <MenuItem
              className="nav-link"
              onClick={(e) => navigate("/register")}
            >
              Sign up
            </MenuItem>
            <Button variant="contained" className="login-btn" size="small">
              <MenuItem
                className="nav-link"
                onClick={(e) => navigate("/login")}
              >
                Log in
              </MenuItem>
            </Button>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
};
export default Navbar;
