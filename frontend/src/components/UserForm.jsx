import {
  Box,
  Button,
  Grid,
  Hidden,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Style/Userform.css";
import axios from "axios";
import { useFormik } from "formik";
import { UserFormSchema } from "../Schema/UserFormSchema";
import { useNavigate } from "react-router-dom";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const UserForm = (props) => {
  // Store details of courses and batches
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_DEV;

  const [userToken, setUserToken] = useState(props.userToken);

  const [userRole, setUserRole] = useState(props.userRole);
  // const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const config = {
    headers: {
      authorization: " Bearer " + userToken,
    },
  };

  // if (props.method === "put") setIsDisabled(true);
  const isUsernameDisabled = props.method === "PUT";
  const isDesignationDisabled = props.method === "PUT";
  const endPoints = [`${API_URL}/course`, `${API_URL}/batch`];
  // getting batch and course from the db collections using axios.all
  useEffect(() => {
    if (userRole !== "Admin") {
      alert("Access denied");
      navigate("/");
    } else {
      axios.all(endPoints.map((endpoint) => axios.get(endpoint, config))).then(
        axios.spread((course, batch) => {
          // console.log("course", course);
          setCourses(course.data);
          setBatches(batch.data);
          // console.log("batch", batch);
          // console.log(props.method);
        })
      );
    }
  }, []);

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleSubmit,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: { ...props.data, password: "" },
    validationSchema: UserFormSchema,
    onSubmit: (values) => {
      // console.log(values);

      if (props.method === "POST") {
        axios
          .post(`${API_URL}/user`, values, config)
          .then((response) => {
            if (response.data.message === "User added successfully") {
              alert(response.data.message);
              window.location.reload();
            } else if (response.data.message === "Unauthorised user") {
              alert(response.data.message);
              navigate("/");
            } else if (
              response.data.message ===
              "Username already exists. Please choose a different username."
            ) {
              alert(response.data.message);
              navigate("/userinfo");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Unable to addd data");
            window.location.reload();
          });
      }
      if (props.method === "PUT") {
        axios
          .put(`${API_URL}/user/${values._id}`, values, config)
          .then((response) => {
            if (response.data.message === "User info updated Successfully") {
              alert(response.data.message);
              window.location.reload();
            } else if (response.data.message === "Unauthorised user") {
              alert(response.data.message);
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("unable to update");
            window.location.reload();
          });
      }
    },
  });

  // user registration or updation form
  return (
    <>
      <Grid justifyContent="center" className="userFrom">
        <Paper elevation={12}>
          <Grid container align="center">
            <Grid item xs={12} sm={12} md={6} lg={1}>
              <Box sx={{ paddingBottom: "25px" }}>
                <Tooltip title="Back to Employee table" arrow>
                  <Button>
                    <SkipPreviousIcon
                      sx={{
                        height: "50px",
                        width: "50px",
                        color: "#3F708D",
                      }}
                      onClick={() => {
                        window.location.reload();
                      }}
                    />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={11}>
              {/* Conditional rendering if method is post h4 willbe Register else Update */}
              <Typography
                variant="h4"
                gutterbottom
                className="register"
                sx={{ fontFamily: "Tektur, cursive", fontWeight: "500" }}
              >
                {props.method === "POST" ? "Register" : "Update User"}
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <form className="Form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    sx={{ m: 1 }}
                    label="Name"
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
                  <Box pl={3}>
                    {errors.name && touched.name ? (
                      <Typography variant="body2" color="error" gutterBottom>
                        {errors.name}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    sx={{ m: 1 }}
                    label="Username"
                    value={values.username}
                    name="username"
                    disabled={isUsernameDisabled}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
                  <Box pl={3}>
                    {errors.username && touched.username ? (
                      <Typography variant="body2" color="error" gutterBottom>
                        {errors.username}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    sx={{ m: 1 }}
                    label="Email"
                    type="email"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
                  <Box pl={3}>
                    {errors.email && touched.email ? (
                      <Typography variant="body2" color="error" gutterBottom>
                        {errors.email}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    sx={{ m: 1 }}
                    label="Phone Number"
                    type="tel"
                    value={values.phone}
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
                  <Box pl={3}>
                    {errors.phone && touched.phone ? (
                      <Typography variant="body2" color="error" gutterBottom>
                        {errors.phone}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    select
                    sx={{ m: 1 }}
                    label="Designation"
                    value={values.designation}
                    name="designation"
                    disabled={isDesignationDisabled}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  >
                    <MenuItem value="Training_head">Training Head</MenuItem>
                    <MenuItem value="Placement_officer">
                      Placement Officer
                    </MenuItem>
                  </TextField>
                  <Box pl={3}>
                    {errors.designation && touched.designation ? (
                      <Typography variant="body2" color="error" gutterBottom>
                        {errors.designation}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>
                {/* conditional rendering if designation is trainer the course drop down willbe shown else batch dropdown */}
                {values.designation === "Training_head" ? (
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField
                      fullWidth
                      select
                      SelectProps={{ multiple: true }}
                      sx={{ m: 1 }}
                      label="Course"
                      value={values.course}
                      name="course"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                    >
                      {courses.map((course) => (
                        <MenuItem
                          key={course.course_name}
                          value={course.course_name}
                        >
                          {course.course_name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Box pl={3}>
                      {errors.course && touched.course ? (
                        <Typography variant="body2" color="error" gutterBottom>
                          {errors.course}
                        </Typography>
                      ) : null}
                    </Box>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TextField
                      fullWidth
                      select
                      SelectProps={{ multiple: true }}
                      sx={{ m: 1 }}
                      label="Batch"
                      value={values.batch}
                      name="batch"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                    >
                      {batches.map((batch) => (
                        <MenuItem
                          key={batch.batch_name}
                          value={batch.batch_name}
                        >
                          {batch.batch_name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Box pl={3}>
                      {errors.batch && touched.batch ? (
                        <Typography variant="body2" color="error" gutterBottom>
                          {errors.batch}
                        </Typography>
                      ) : null}
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    sx={{ m: 1 }}
                    label="Password"
                    value={values.password}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
                  <Box pl={3}>
                    {errors.password && touched.password ? (
                      <Typography variant="body2" color="error" gutterBottom>
                        {errors.password}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    sx={{ m: 1 }}
                    label="Confirm Password"
                    type="password"
                    value={values.confirmpassword}
                    name="confirmpassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
                  <Box pl={3}>
                    {errors.confirmpassword && touched.confirmpassword ? (
                      <Typography variant="body2" color="error" gutterBottom>
                        {errors.confirmpassword}
                      </Typography>
                    ) : null}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                  {props.method === "POST" ? (
                    <Button
                      sx={{
                        padding: "4%",
                        marginLeft: "2%",
                        color: "#3F708D",
                        fontWeight: "bold",
                      }}
                      type="reset"
                      fullWidth
                      variant="outlined"
                      // color="secondary"
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        padding: "4%",
                        marginLeft: "2%",
                        color: "#3F708D",
                        fontWeight: "bold",
                      }}
                      type="reset"
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Button
                    type="submit"
                    sx={{
                      padding: "4%",
                      marginLeft: "2%",
                      marginBottom: "6%",
                      backgroundColor: "#3F708D",
                    }}
                    fullWidth
                    variant="contained"
                    color="secondary"
                  >
                    {props.method === "POST" ? "Register" : "Update"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default UserForm;
