import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Style/Userform.css";
import axios from "axios";

const UserForm = (props) => {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  const endPoints = [
    "http://localhost:8000/api/course",
    "http://localhost:8000/api/batch",
  ];

  useEffect(() => {
    axios.all(endPoints.map((endpoint) => axios.get(endpoint))).then(
      axios.spread((course, batch) => {
        console.log("course", course);
        setCourses(course.data);
        setBatches(batch.data);
        console.log("batch", batch);
      })
    );
  }, []);
  const [user, setUser] = useState(props.data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Grid justifyContent="center" className="userFrom">
      <Paper elevation={1}>
        <Grid align="center">
          <Typography variant="h4" gutterbottom className="register">
            {props.method === "post" ? "Register" : "Update User"}
          </Typography>
        </Grid>
        <Grid>
          <form className="Form">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Name"
                  value={user.name}
                  name="name"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Username"
                  value={user.username}
                  name="username"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Email"
                  type="email"
                  value={user.email}
                  name="email"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Phone Number"
                  type="tel"
                  value={user.phone}
                  name="phone"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  fullWidth
                  select
                  sx={{ m: 2 }}
                  label="Designation"
                  value={user.designation}
                  name="designation"
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value="Training_head">Training Head</MenuItem>
                  <MenuItem value="Placement_officer">
                    Placement Officer
                  </MenuItem>
                </TextField>
              </Grid>
              {user.designation === "Training_head" ? (
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    select
                    SelectProps={{ multiple: true }}
                    sx={{ m: 2 }}
                    label="Course"
                    value={user.course}
                    name="course"
                    onChange={handleChange}
                    variant="outlined"
                  >
                    {courses.map((course) => (
                      <>
                        <MenuItem
                          key={course.course_name}
                          value={course.course_name}
                        >
                          {course.course_name}
                        </MenuItem>
                      </>
                    ))}
                  </TextField>
                </Grid>
              ) : (
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    select
                    SelectProps={{ multiple: true }}
                    sx={{ m: 2 }}
                    label="Batch"
                    value={user.batch}
                    name="batch"
                    onChange={handleChange}
                    variant="outlined"
                  >
                    {batches.map((batch) => (
                      <>
                        <MenuItem
                          key={batch.batch_name}
                          value={batch.batch_name}
                        >
                          {batch.batch_name}
                        </MenuItem>
                      </>
                    ))}
                  </TextField>
                </Grid>
              )}
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Password"
                  value={user.password}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Confirm Password"
                  value={user.confirmpassword}
                  name="confirmpassword"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                {props.method === "post" ? (
                  <Button
                    sx={{ padding: "4%", marginLeft: "6%" }}
                    type="reset"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    // onClick={clearInput}
                  >
                    Reset
                  </Button>
                ) : (
                  <Button
                    sx={{ padding: "4%", marginLeft: "6%" }}
                    type="reset"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    // onClick={showList}
                  >
                    Cancel
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Button
                  type="submit"
                  sx={{ padding: "4%", marginLeft: "6%", marginBottom: "6%" }}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  // onClick={addEmployee}
                >
                  {props.method === "post" ? "Register" : "Update"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default UserForm;
