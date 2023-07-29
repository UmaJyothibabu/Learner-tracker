import React, { useState } from "react";
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

const drawerWidth = 240;

const Navbar = (props) => {
  // const [userToken, setUserToken] = useState(
  //   sessionStorage.getItem("userToken")
  // );

  // const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  // const [userRole, setUserRole] = useState(sessionStorage.getItem("role"));
  // const [username, setUsername] = useState(sessionStorage.getItem("username"));
  // console.log(userToken);
  // console.log(userRole);
  // console.log(username);

  const { userRole, userToken } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  // cleaaring session storage on logout to prevent entering the app without out logging in
  const logoutHandler = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link
          to="/studentTable"
          style={{ color: "#2E3B55", textDecoration: "none" }}
        >
          ICTK Learner Tracker
        </Link>
      </Typography>
      <Divider />
      <List>
        <ListItem key={1} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link
              to="/studentTable"
              style={{ color: "#2E3B55", textDecoration: "none" }}
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
                  style={{ color: "#2E3B55", textDecoration: "none" }}
                >
                  <ListItemText primary="Course Details" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem key={3} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Link
                  to="/userinfo"
                  style={{ color: "#2E3B55", textDecoration: "none" }}
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
                style={{ color: "#2E3B55", textDecoration: "none" }}
              >
                <ListItemText primary="CSV Upload" />
              </Link>
            </ListItemButton>
          </ListItem>
        )}

        <ListItem key={5} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} onClick={logoutHandler}>
            <Link style={{ color: "#2E3B55", textDecoration: "none" }}>
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

            <Button key={55} sx={{ color: "#fff" }} onClick={logoutHandler}>
              <Link style={{ color: "white", textDecoration: "none" }}>
                Logout
              </Link>
            </Button>
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
