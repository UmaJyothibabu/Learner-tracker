import React from "react";
import {
  AppBar,
  Box,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import logo from "../images/logosmall.png";
// navbar color
const theme = createTheme({
  palette: {
    primary: {
      main: "#11425f",
    },
  },
});

const LoginHeader = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            {/* adding logo to navbar */}
            <Box component="img" sx={{ height: 54 }} alt="Logo" src={logo} />
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              fontWeight="bold"
              component="div"
              sx={{ flexGrow: 1, fontFamily: "Noto Serif, serif" }}
            >
              ICTAK LEARNER TRACKER
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
};

export default LoginHeader;
