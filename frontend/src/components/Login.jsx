import React, { useEffect, useState } from "react";
import "../Style/Eform.css";
import {
  Box,
  Card,
  createTheme,
  InputAdornment,
  ThemeProvider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginHeader from "./LoginHeader";
import { Formik, useFormik } from "formik";
import { LoginSchema } from "../Schema/LoginSchema";

const Login = () => {
  const initialValues = { username: "", password: "" };
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,
      onSubmit: (values) => {
        console.log(values);
        axios
          .post("http://localhost:8000/api/login", values)
          .then((response) => {
            if (response.data.message === "Login Successfully") {
              const token = response.data.token;
              const userId = response.data.data._id;
              const role = response.data.data.designation;
              const username = response.data.data.username;
              sessionStorage.setItem("userToken", token);
              sessionStorage.setItem("role", role);
              sessionStorage.setItem("userId", userId);
              sessionStorage.setItem("username", username);
              alert(response.data.message);
              if (role === "Admin") navigate("/userinfo");
              else {
                navigate("/studentTable");
              }
            } else {
              alert("Invalid credentials");
              window.location.reload();
            }
          });
      },
    });

  const navigate = useNavigate();

  const theme = createTheme({
    typography: {
      fontFamily: ["Roboto Slab", "serif"].join(","),
    },
  });
  return (
    <>
      <LoginHeader />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ paddingTop: "80px" }}
      >
        <Grid item xs={6} sm={6} md={6} lg={4}>
          <ThemeProvider theme={theme}>
            <Card sx={{ minWidth: 275, fontFamily: "Roboto Slab, serif" }}>
              <Paper elevation={24} className="paperStyle">
                <Grid align="center">
                  <Grid>
                    <Typography
                      className="Header"
                      variant="h4"
                      gutterBottom
                      sx={{
                        // fontWeight: "bold",
                        color: "#ffffff",
                        fontFamily: "Noto Serif, serif",
                      }}
                    >
                      Login
                    </Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <form className="Form" onSubmit={handleSubmit}>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      sx={{ m: 2 }}
                      label="Username"
                      value={values.username}
                      name="username"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <br />
                    <Box pl={3}>
                      {errors.username && touched.username ? (
                        <Typography variant="body2" color="error" gutterBottom>
                          {errors.username}
                        </Typography>
                      ) : null}
                    </Box>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      sx={{ m: 2 }}
                      name="password"
                      value={values.password}
                      type="password"
                      label="Password"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <br />
                    <Box pl={3}>
                      {errors.password && touched.password ? (
                        <Typography variant="body2" color="error" gutterBottom>
                          {errors.password}
                        </Typography>
                      ) : null}
                    </Box>

                    <Button
                      sx={{
                        padding: "2%",
                        marginLeft: "3.5%",
                        fontSize: "1.2em",
                      }}
                      className="login"
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="success"
                    >
                      Login
                    </Button>
                  </form>
                </Grid>
              </Paper>
            </Card>
          </ThemeProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
