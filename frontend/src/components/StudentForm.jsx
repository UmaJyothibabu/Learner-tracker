import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "../Style/Studentform.css"; // Make sure to replace with the correct path for your CSS file

const StudentForm = (props) => {
  const [student, setStudent] = useState(props.data);
  const [studentAddress, setStudentAddress] = useState(
    props.data.student_address || {
      address: "",
      district: "",
      state: "",
      pin: "",
    }
  );

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setStudentAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleStudentChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  return (
    <Grid justifyContent="center" className="studentForm">
      <Paper elevation={1}>
        <Grid align="center">
          <Typography variant="h4" gutterBottom className="register">
            {props.method === "post" ? "Register Student" : "Update Student"}
          </Typography>
        </Grid>
        <Grid>
          <form className="Form">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Student Name"
                  value={student.student_name}
                  name="student_name"
                  variant="outlined"
                  onChange={handleStudentChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Email"
                  type="email"
                  value={student.email_id}
                  name="email_id"
                  variant="outlined"
                  onChange={handleStudentChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Phone Number"
                  type="tel"
                  value={student.phone}
                  name="phone"
                  variant="outlined"
                  onChange={handleStudentChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Course"
                  value={student.course}
                  name="course"
                  variant="outlined"
                  onChange={handleStudentChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Batch"
                  value={student.batch}
                  name="batch"
                  variant="outlined"
                  onChange={handleStudentChange}
                />
              </Grid>
              {/* Other input fields */}
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Address"
                  value={studentAddress.address}
                  name="address"
                  variant="outlined"
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="District"
                  value={studentAddress.district}
                  name="district"
                  variant="outlined"
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="State"
                  value={studentAddress.state}
                  name="state"
                  variant="outlined"
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="PIN"
                  value={studentAddress.pin}
                  name="pin"
                  variant="outlined"
                  onChange={handleAddressChange}
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary" // Blue background for "Register Student" button
                      sx={{ padding: "4%", width: "70%" }}
                      // onClick={addStudent}
                    >
                      {props.method === "post" ? "Register Student" : "Update Student"}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="reset"
                      variant="contained"
                      color="secondary" // Red background for "Reset" button
                      sx={{ padding: "4%", width: "40%" }}
                    //   onClick={clearInput or showList}
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
