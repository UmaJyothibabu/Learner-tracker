import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "../Style/Userform.css";
const UserForm = (props) => {
  const [user, setUser] = useState(props.data);
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
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  fullWidth
                  sx={{ m: 2 }}
                  label="Designation"
                  value={user.designation}
                  name="designation"
                  variant="outlined"
                />
              </Grid>
              {user.designation === "Training_head" ? (
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    sx={{ m: 2 }}
                    label="Course"
                    value={user.course}
                    name="course"
                    variant="outlined"
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    sx={{ m: 2 }}
                    label="Batch"
                    value={user.batch}
                    name="batch"
                    variant="outlined"
                  />
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
