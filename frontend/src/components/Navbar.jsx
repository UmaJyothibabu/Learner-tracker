import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import axios from "axios";
import { Avatar, Grid, Popover, Tooltip } from "@mui/material";
import UpdatePassword from "./UpdatePassword";

const drawerWidth = 240;

const Navbar = (props) => {
  const { userRole, userToken, userId } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isProfilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // State for drawer open/close

  const config = {
    headers: {
      authorization: " Bearer " + userToken,
    },
  };

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_DEV;

  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }

    axios
      .get(`${API_URL}/userid/${userId}`, config)

      .then((response) => {
        if (
          response.data.message === "unable to find" ||
          response.data.message === "Unauthorised user"
        ) {
          alert(response.data.message);
          navigate("/");
        } else {
          // console.log("response", response.data);
          setUser(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, userToken, navigate]);

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
    setProfilePopoverOpen(true);
  };

  const handleProfileClose = () => {
    setProfilePopoverOpen(false); // Close the popover
    setProfileAnchorEl(false);
  };
  const handleProfileDetails = () => {
    profileOpen ? setProfileOpen(false) : setProfileOpen(true);
    // setProfileOpen(true);
  };

  // clearing session storage on logout to prevent entering the app without out logging in
  const logoutHandler = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlePasswordChangeClick = () => {
    handleClickOpen(); // Open the password change dialog
    setProfileOpen(false); // Close the profile details if open
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link
          to="/studentTable"
          style={{ color: "white", textDecoration: "none" }}
        >
          ICTK Learner Tracker
        </Link>
      </Typography>
      <Divider />
      <br />
      <AccountCircleIcon
        onClick={handleProfileDetails}
        sx={{ color: "white", fontSize: 30 }}
      />
      {profileOpen === true && (
        <>
          <Grid container align="center" justifyContent="center">
            <Grid item xs={12}>
              <Typography
                key={user.name}
                variant="subtitle1"
                sx={{ fontFamily: "Noto Serif, serif", color: "white" }}
              >
                {user.name}
              </Typography>
              <Typography
                key={user.username}
                variant="subtitle1"
                sx={{ fontFamily: "Noto Serif, serif", color: "white" }}
              >
                {user.username}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "Noto Serif, serif", color: "white" }}
              >
                {user.designation}
              </Typography>
            </Grid>
            <Button
              onClick={handlePasswordChangeClick}
              // onClick={handleClickOpen}
              sx={{ color: "white", fontFamily: "Noto Serif, serif" }}
            >
              Change Password
            </Button>
            {open && (
              <UpdatePassword
                userRole={userRole}
                userToken={userToken}
                userId={userId}
                user={user}
              />
            )}
            <Grid item xs={12}>
              <Divider sx={{ color: "white" }} />
            </Grid>
          </Grid>
        </>
      )}
      <List>
        <ListItem key={1} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link
              to="/studentTable"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemText primary="Student Details" />
            </Link>
          </ListItemButton>
        </ListItem>

        {userRole === "Admin" && (
          <>
            <ListItem key={2} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Link
                  to="/courseinfo"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <ListItemText primary="Course Details" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem key={3} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Link
                  to="/userinfo"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <ListItemText primary="Faculty" />
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        )}

        {(userRole === "Admin" || userRole === "Training_head") && (
          <ListItem key={4} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                to="/bulkupload"
                style={{ color: "white", textDecoration: "none" }}
              >
                <ListItemText primary="CSV Upload" />
              </Link>
            </ListItemButton>
          </ListItem>
        )}

        <ListItem key={5} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} onClick={logoutHandler}>
            <Link style={{ color: "white", textDecoration: "none" }}>
              <ListItemText primary="Logout" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" style={{ background: "#11425f" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link
              to="/studentTable"
              style={{
                color: "white",
                textDecoration: "none",
                fontFamily: "Noto Serif, serif",
              }}
            >
              ICTK Learner Tracker
            </Link>
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button key={11} sx={{ color: "#fff" }}>
              <Link
                to="/studentTable"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Student Details
              </Link>
            </Button>

            {userRole === "Admin" && (
              <>
                <Button key={22} sx={{ color: "#fff" }}>
                  <Link
                    to="/courseinfo"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Course Details
                  </Link>
                </Button>
                <Button key={33} sx={{ color: "#fff" }}>
                  <Link
                    to="/userinfo"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Faculty
                  </Link>
                </Button>
              </>
            )}

            {(userRole === "Admin" || userRole === "Training_head") && (
              <Button key={44} sx={{ color: "#fff" }}>
                <Link
                  to="/bulkupload"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  CSV Upload
                </Link>
              </Button>
            )}

            <Tooltip title={user.name} arrow>
              <IconButton
                key={55}
                sx={{ color: "#707799" }}
                onClick={handleProfileClick}
              >
                {/* <Link style={{ color: "white", textDecoration: "none" }}>
                Logout
              </Link> */}
                <Avatar sx={{ backgroundColor: "#707799" }}>
                  <PermIdentityIcon sx={{ fontSize: 30 }} />
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* <ClickAwayListener onClickAway={handleProfileClose}> */}
            <Popover
              open={Boolean(profileAnchorEl)}
              anchorEl={profileAnchorEl}
              onClose={handleProfileClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                // zIndex: 9999,
                "& .MuiPopover-paper": {
                  width: 250, // Set the custom width here
                  backgroundColor: "#5691B3",
                  color: "white",
                  boxShadow: 12,
                },
              }}
            >
              <Grid container align="center" justifyContent="center">
                <Grid iiem xs={3}>
                  <AccountCircleIcon sx={{ fontSize: 50 }} />
                </Grid>
                <Grid item xs={9} align="left">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Noto Serif, serif" }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "Noto Serif, serif" }}
                  >
                    {user.username}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
              <Grid align="center" justifyContent="center">
                <Typography
                  variant="subtitle2"
                  sx={{ fontFamily: "Noto Serif, serif" }}
                >
                  {user.designation}
                </Typography>
                <Button
                  onClick={handleClickOpen}
                  sx={{ color: "white", fontFamily: "Noto Serif, serif" }}
                >
                  Change Password
                </Button>
                {open && (
                  <UpdatePassword
                    userRole={userRole}
                    userToken={userToken}
                    userId={userId}
                    user={user}
                  />
                )}

                <Button
                  onClick={logoutHandler}
                  endIcon={<LogoutIcon />}
                  sx={{ color: "white", fontFamily: "Noto Serif, serif" }}
                >
                  Logout
                </Button>
              </Grid>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#11425f",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
