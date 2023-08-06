import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
import { passwordUpdateSchema } from "../Schema/PasswordUpdateSchema";

const UpdatePassword = ({ userRole, userToken, userId, user }) => {
  const [open, setOpen] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordUpdate, setPasswordUpdate] = useState({});
  const [initialValues, setInitialValues] = useState({
    currentPassword: "",
    password: "",
    confirmpassword: "",
  });

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
              window.location.reload();
            } else {
              alert(response.data.message);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  return (
    <>
      {/* <Button
        onClick={handleClickOpen}
        sx={{ color: "white", fontFamily: "Noto Serif, serif" }}
      >
        Change Password
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            minWidth: "20vw",
          },
        }}
      >
        <DialogTitle align="center">Change Password</DialogTitle>
        <Grid overflow="hidden" justifyContent="center" align="center">
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
            <DialogActions>
              <Button type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Update password</Button>
            </DialogActions>
          </form>
        </Grid>
      </Dialog>
    </>
  );
};

export default UpdatePassword;
