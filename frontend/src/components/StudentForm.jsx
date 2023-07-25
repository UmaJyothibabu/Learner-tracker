import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import StudentFormSchema from "../Schema/StudentFormSchema"; // Import the form validation schema

const StudentForm = (props) => {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseAndBatchData = async () => {
      try {
        const courseResponse = await axios.get("http://localhost:8000/api/course");
        const batchResponse = await axios.get("http://localhost:8000/api/batch");
        const projectResponse = await axios.get("http://localhost:8000/api/project");

        setCourses(courseResponse.data);
        setBatches(batchResponse.data);
        setProjects(projectResponse.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchCourseAndBatchData();
  }, []);

  const {
    values,
    handleSubmit,
    handleChange,
    handleReset,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues: {
      ...props.data,
      student_address: props.data.student_address || {
        address: "",
        district: "",
        state: "",
        pin: "",
      },
      course: props.data.course?._id || "",
      batch: props.data.batch?._id || "",
      project: props.data.project?._id || "",
    },
    validationSchema: StudentFormSchema,
    onSubmit: async (values) => {
      try {
        // Replace the selected course, batch, and project IDs with their names
        const selectedCourse = courses.find((course) => course._id === values.course);
        const selectedBatch = batches.find((batch) => batch._id === values.batch);
        const selectedProject = projects.find((project) => project._id === values.project);

        values.course = selectedCourse ? selectedCourse.course_name : "";
        values.batch = selectedBatch ? selectedBatch.batch_name : "";
        values.project = selectedProject ? selectedProject.project_name : "";

        const response = await axios.post("http://localhost:8000/api/students", values);
        console.log("Form submission successful!", response.data);
        navigate("/students");
      } catch (error) {
        console.log("Error submitting form:", error);
      }
    },
  });

  return (
    <Grid justifyContent="center" className="studentForm">
      <Paper elevation={1}>
        <Grid align="center">
          <Typography variant="h4" gutterBottom className="register">
            {props.method === "post" ? "Register Student" : "Update Student"}
          </Typography>
        </Grid>
        <Grid>
          <form className="Form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Student Name"
                  value={values.student_name}
                  name="student_name"
                  variant="outlined"
                  onChange={handleChange}
                  error={Boolean(errors.student_name)}
                  helperText={errors.student_name}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Email"
                  type="email"
                  value={values.email_id}
                  name="email_id"
                  variant="outlined"
                  onChange={handleChange}
                  error={Boolean(errors.email_id)}
                  helperText={errors.email_id}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Phone Number"
                  type="tel"
                  value={values.phone}
                  name="phone"
                  variant="outlined"
                  onChange={handleChange}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  select
                  label="Course"
                  value={values.course}
                  name="course"
                  variant="outlined"
                  onChange={handleChange}
                  error={Boolean(errors.course)}
                  helperText={errors.course}
                >
                  {courses.map((course) => (
                    <MenuItem key={course._id} value={course._id}>
                      {course.course_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  select
                  label="Batch"
                  value={values.batch}
                  name="batch"
                  variant="outlined"
                  onChange={handleChange}
                  error={Boolean(errors.batch)}
                  helperText={errors.batch}
                >
                  {batches.map((batch) => (
                    <MenuItem key={batch._id} value={batch._id}>
                      {batch.batch_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  select
                  label="Project"
                  value={values.project}
                  name="project"
                  variant="outlined"
                  onChange={handleChange}
                  error={Boolean(errors.project)}
                  helperText={errors.project}
                >
                  {projects.map((project) => (
                    <MenuItem key={project._id} value={project._id}>
                      {project.project_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  select
                  label="Course Status"
                  value={values.course_status}
                  name="course_status"
                  variant="outlined"
                  onChange={handleChange}
                  error={Boolean(errors.course_status)}
                  helperText={errors.course_status}
                >
                  <MenuItem value="Qualified">Qualified</MenuItem>
                  <MenuItem value="Incompetent">Incompetent</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  select
                  label="Placement Status"
                  value={values.placement_status}
                  name="placement_status"
                  variant="outlined"
                  onChange={handleChange}
                  error={Boolean(errors.placement_status)}
                  helperText={errors.placement_status}
                >
                  <MenuItem value="Placed">Placed</MenuItem>
                  <MenuItem value="Not Placed">Not Placed</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Training Head"
                  value={values.training_head}
                  name="training_head"
                  variant="outlined"
                  onChange={handleChange}
                  error={Boolean(errors.training_head)}
                  helperText={errors.training_head}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Placement Officer"
                  value={values.placement_officer}
                  name="placement_officer"
                  variant="outlined"
                  onChange={handleChange}
                  error={Boolean(errors.placement_officer)}
                  helperText={errors.placement_officer}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
  <TextField
    fullWidth
    sx={{ m: 2 }}
    label="Address"
    value={values.student_address.address}
    name="student_address.address"
    variant="outlined"
    onChange={handleChange}
    error={Boolean(errors.student_address?.address)}
    helperText={errors.student_address?.address}
  />
</Grid>
<Grid item xs={12} sm={12} md={6} lg={6}>
  <TextField
    fullWidth
    sx={{ m: 2 }}
    label="District"
    value={values.student_address.district}
    name="student_address.district"
    variant="outlined"
    onChange={handleChange}
    error={Boolean(errors.student_address?.district)}
    helperText={errors.student_address?.district}
  />
</Grid>
<Grid item xs={12} sm={12} md={6} lg={6}>
  <TextField
    fullWidth
    sx={{ m: 2 }}
    label="State"
    value={values.student_address.state}
    name="student_address.state"
    variant="outlined"
    onChange={handleChange}
    error={Boolean(errors.student_address?.state)}
    helperText={errors.student_address?.state}
  />
</Grid>
<Grid item xs={12} sm={12} md={6} lg={6}>
  <TextField
    fullWidth
    sx={{ m: 2 }}
    label="Pin"
    type="number"
    value={values.student_address.pin}
    name="student_address.pin"
    variant="outlined"
    onChange={handleChange}
    error={Boolean(errors.student_address?.pin)}
    helperText={errors.student_address?.pin}
  />
</Grid>

              {/* Buttons */}
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ padding: "4%", width: "70%" }}
                      disabled={isSubmitting}
                    >
                      {props.method === "post"
                        ? "Register Student"
                        : "Update Student"}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      sx={{ padding: "4%", width: "40%" }}
                      onClick={handleReset}
                      disabled={isSubmitting}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default StudentForm;
