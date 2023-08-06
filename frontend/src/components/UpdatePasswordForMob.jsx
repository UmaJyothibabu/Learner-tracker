import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { passwordUpdateSchema } from "../Schema/PasswordUpdateSchema";
import { useNavigate } from "react-router-dom";
import "../Style/Userform.css";

const UpdatePasswordForMob = () => {
  const [userToken, setUserToken] = useState(
    sessionStorage.getItem("userToken")
  );
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [userRole, setUserRole] = useState(sessionStorage.getItem("role"));
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  // const [passwordUpdate, setPasswordUpdate] = useState({});
  const [initialValues, setInitialValues] = useState({
    currentPassword: "",
    password: "",
    confirmpassword: "",
  });

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

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: passwordUpdateSchema,
      onSubmit: (values) => {
        console.log(values);
        axios
          .put(`${API_URL}/updatepassword/${userId}`, values, config)
          .then((response) => {
            if (response.data.message === "Password updated Successfully") {
              alert(response.data.message);
              navigate("/studentTable");
            } else {
              alert(response.data.message);
              navigate("/studentTable");
            }
          })
          .catch((err) => {
            alert(err);
          });
      },
    });

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_DEV;

  const config = {
    headers: {
      authorization: " Bearer " + userToken,
    },
  };
  //   const handleChange = (e) => {
  //     setPasswordUpdate({ ...passwordUpdate, [e.target.name]: e.target.value });
  //   };

  const checkPassword = (e) => {
    const oldPassword = {
      username: user.username,
      password: e.target.value,
    };
    axios
      .post(`${API_URL}/oldpassword`, oldPassword, config)
      .then((response) => {
        if (response.data.message === "Correct Password") {
          setIsCorrect(true);
        } else if (response.data.message === "Incorrect Password") {
          setMessage(response.data.message);
        }
      });
  };

  const handleCancel = () => {
    navigate("/studentTable");
  };

  return (
    <Grid
      justifyContent="center"
      align="center"
      //   className="userFrom"
      sx={{
        paddingTop: "20vh",
        paddingBottom: "3vh",
        width: "70vw",
        margin: " 0 auto",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column", // To stack the items vertically
          padding: "20px",
        }}
      >
        <Grid container>
          <Typography
            variant="h6"
            gutterBottom
            align="center"
            sx={{ color: "#3F708D" }}
          >
            Change Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid>
              <TextField
                fullwidth
                sx={{ m: 1 }}
                type="password"
                label="Current Password"
                value={values.currentPassword}
                name="currentPassword"
                required
                variant="outlined"
                onBlur={(e) => {
                  handleBlur(e);
                  checkPassword(e);
                }}
                //   onMouseLeave={handleMouseLeave}
                onChange={handleChange}
              />
              <Box pl={3}>
                {errors.currentPassword && touched.currentPassword ? (
                  <Typography variant="body2" color="error" gutterBottom>
                    {errors.currentPassword}
                  </Typography>
                ) : null}
              </Box>
              {!isCorrect && (
                <Typography
                  sx={{ color: "red" }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {message}
                </Typography>
              )}
            </Grid>

            {isCorrect && (
              <>
                <Grid>
                  <TextField
                    fullwidth
                    sx={{ m: 1 }}
                    label="New Password"
                    value={values.password}
                    name="password"
                    type="password"
                    required
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <Box pl={3}>
                    {errors.password && touched.password ? (
                      <Typography variant="body2" color="error" gutterBottom>
                        {errors.password}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>
                <Grid>
                  <TextField
                    fullwidth
                    sx={{ m: 1 }}
                    label="Confirm Password"
                    value={values.confirmpassword}
                    name="confirmpassword"
                    type="password"
                    required
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

                  <Box pl={3}>
                    {errors.confirmpassword && touched.confirmpassword ? (
                      <Typography variant="body2" color="error" gutterBottom>
                        {errors.confirmpassword}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>
              </>
            )}

            <Button
              type="button"
              variant="contained"
              onClick={handleCancel}
              sx={{
                padding: "4%",
                marginLeft: "2%",
                marginBottom: "6%",
                backgroundColor: "#3F708D",
              }}
              gutterBottom
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                padding: "4%",
                marginLeft: "2%",
                marginBottom: "6%",
                backgroundColor: "#3F708D",
              }}
            >
              Update password
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default UpdatePasswordForMob;
