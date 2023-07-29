import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import "../Style/Studentform.css";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import StudentFormSchema from "../Schema/StudentFormSchema"; // Import the form validation schema

const StudentForm = (props) => {
  console.log(props.data);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [projects, setProjects] = useState([]);
  const [trainingHeads, setTrainingHeads] = useState([]);
  const [placemenOfficers, setPlacementOfficers] = useState([]);

  const navigate = useNavigate();

  const [userToken, setUserToken] = useState(props.userToken);

  // const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [userRole, setUserRole] = useState(props.userRole);
  const [username, setUsername] = useState(props.username);
  const config = {
    headers: {
      authorization: " Bearer " + userToken,
    },
  };

  useEffect(() => {
    if (userRole === "Admin" || userRole === "Training_head") {
      const fetchCourseAndBatchData = async () => {
        try {
          const courseResponse = await axios.get(
            "http://localhost:8000/api/course",
            config
          );
          const batchResponse = await axios.get(
            "http://localhost:8000/api/batch",
            config
          );
          const projectResponse = await axios.get(
            "http://localhost:8000/api/project",
            config
          );
          const trainerResponse = await axios.get(
            `http://localhost:8000/api/user/Training_head`,
            config
          );
          const placementOfficerResponse = await axios.get(
            `http://localhost:8000/api/user/Placement_officer`,
            config
          );
          console.log(placementOfficerResponse.data);
          console.log(trainerResponse.data);
          setPlacementOfficers(placementOfficerResponse.data);
          setTrainingHeads(trainerResponse.data);
          setCourses(courseResponse.data);
          setBatches(batchResponse.data);
          setProjects(projectResponse.data);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };

      fetchCourseAndBatchData();
    } else {
      alert("Access denied");
      navigate("/");
    }
  }, []);

  const {
    values,
    handleSubmit,
    handleChange,
    handleReset,
    handleBlur,
    touched,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues: {
      ...props.data,
      training_head:
        userRole === "Training_head" ? username : props.data.training_head,
      student_address: props.data.student_address || {
        address: "",
        district: "",
        state: "",
        pin: "",
      },
    },

    validationSchema: StudentFormSchema,
    onSubmit: async (values) => {
      try {
        if (props.method === "post") {
          const response = await axios.post(
            "http://localhost:8000/api/students",
            values,
            config
          );
          console.log("Form submission successful!", response.data);
          if (response.data.message === "Student added successfully") {
            alert(response.data.message);
            window.location.reload();
          } else if (response.data.message === "Unauthorised user") {
            alert(response.data.message);
            navigate("/");
          }
        }
        if (props.method === "put") {
          axios
            .put(
              `http://localhost:8000/api/students/${values._id}`,
              values,
              config
            )
            .then((response) => {
              if (response.data.message === "Student updated successfully") {
                alert(response.data.message);
                window.location.reload();
              } else if (response.data.message === "Unauthorised user") {
                alert(response.data.message);
                navigate("/");
              }
            })
            .catch((err) => {
              console.log(err);
              alert("Unable to update");
            });
        }
      } catch (error) {
        alert("Unable to load");
        console.log("Error submitting form:", error);
      }
    },
  });

  return (
    <Grid justifyContent="center" className="studentForm">
      <Paper elevation={1}>
        {/* <Box sx={{ paddingBottom: "25px" }}> */}
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Tooltip title="Back to Student table" arrow>
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
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={8}>
            <Typography
              variant="h4"
              gutterBottom
              className="register"
              // align="center"
              sx={{ fontFamily: "Tektur, cursive", fontWeight: "500" }}
            >
              {props.method === "post" ? "Register Student" : "Update Student"}
            </Typography>
          </Grid>
        </Grid>
        {/* </Box> */}
        <Grid>
          <form className="Form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Student Name"
                  value={values.student_name}
                  name="student_name"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Box pl={3}>
                  {errors.student_name && touched.student_name ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.student_name}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={values.email_id}
                  name="email_id"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Box pl={3}>
                  {errors.email_id && touched.email_id ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.email_id}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  value={values.phone}
                  name="phone"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Box pl={3}>
                  {errors.phone && touched.phone ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.phone}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  select
                  label="Course"
                  value={values.course}
                  name="course"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {courses.map((course) => (
                    <MenuItem key={course._id} value={course.course_name}>
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
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  select
                  label="Batch"
                  value={values.batch}
                  name="batch"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {batches.map((batch) => (
                    <MenuItem key={batch._id} value={batch.batch_name}>
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
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  select
                  label="Project"
                  value={values.project}
                  name="project"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {projects.map((project) => (
                    <MenuItem key={project._id} value={project.project_name}>
                      {project.project_name}
                    </MenuItem>
                  ))}
                </TextField>
                <Box pl={3}>
                  {errors.project && touched.project ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.project}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  select
                  label="Course Status"
                  value={values.course_status}
                  name="course_status"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="Qualified">Qualified</MenuItem>
                  <MenuItem value="Incompetent">Incompetent</MenuItem>
                </TextField>
                <Box pl={3}>
                  {errors.course_status && touched.course_status ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.course_status}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <TextField
                  fullWidth
                  select
                  label="Placement Status"
                  value={values.placement_status}
                  name="placement_status"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="Placed">Placed</MenuItem>
                  <MenuItem value="Job Seeking">Job Seeking</MenuItem>
                  <MenuItem value="Not interested">Not Interested</MenuItem>
                </TextField>
                <Box pl={3}>
                  {errors.placement_status && touched.placement_status ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.placement_status}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  select
                  label="Training Head"
                  value={values.training_head}
                  name="training_head"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {trainingHeads.map((thead) => (
                    <MenuItem key={thead.name} value={thead.username}>
                      {thead.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Box pl={3}>
                  {errors.training_head && touched.training_head ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.training_head}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  select
                  label="Placement Officer"
                  value={values.placement_officer}
                  name="placement_officer"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {placemenOfficers.map((pofficer) => {
                    const batches = pofficer.batch.filter(
                      (val) => val === values.batch
                    );
                    if (batches.length !== 0)
                      return (
                        <MenuItem key={pofficer.name} value={pofficer.username}>
                          {pofficer.name}
                        </MenuItem>
                      );
                  })}
                </TextField>
                <Box pl={3}>
                  {errors.placement_officer && touched.placement_officer ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.placement_officer}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Address"
                  value={values.student_address.address}
                  name="student_address.address"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Box pl={3}>
                  {errors.student_address?.address &&
                  touched.student_address?.address ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.student_address?.address}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="District"
                  value={values.student_address.district}
                  name="student_address.district"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Box pl={3}>
                  {errors.student_address?.district &&
                  touched.student_address?.district ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.student_address?.district}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="State"
                  value={values.student_address.state}
                  name="student_address.state"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Box pl={3}>
                  {errors.student_address?.state &&
                  touched.student_address?.state ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.student_address?.state}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Pin"
                  type="text"
                  value={values.student_address.pin}
                  name="student_address.pin"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Box pl={3}>
                  {errors.student_address?.pin &&
                  touched.student_address?.pin ? (
                    <Typography variant="body2" color="error" gutterBottom>
                      {errors.student_address?.pin}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>

              {/* Buttons */}
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: "2%",
                    marginBottom: "6%",
                    backgroundColor: "#3F708D",
                  }}
                  disabled={isSubmitting}
                >
                  {props.method === "post"
                    ? "Register Student"
                    : "Update Student"}
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{
                    padding: "2%",
                    marginBottom: "6%",
                    backgroundColor: "#3F708D",
                  }}
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default StudentForm;
