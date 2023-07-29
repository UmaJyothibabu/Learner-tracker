import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDeletion = ({ user, userToken, userRole }) => {
  console.log(user);
  const [assigned, setAssigned] = useState(true);
  const [substitute, setSubstitute] = useState({});
  const [faculty, setFaculty] = useState([]);
  const [substituteInfo, setSubstituteInfo] = useState({});
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //setting axios header
  const config = {
    headers: {
      authorization: " Bearer " + userToken,
    },
  };

  // checking the faculty to be deleted has students assigned
  useEffect(() => {
    if (userRole !== "Admin") {
      alert("Access denied");
      navigate("/");
    } else {
      if (user.designation === "Training_head") {
        setSubstituteInfo({ ...setSubstituteInfo, assignement: user.course });
      } else if (user.designation === "Placement_officer") {
        setSubstituteInfo({ ...setSubstituteInfo, assignement: user.batch });
      }
      axios
        .get(
          `http://localhost:8000/api/students/${user.username}/${user.designation}`,
          config
        )
        .then((response) => {
          if (
            response.data.message ===
            "This faculty is not assigned with any student"
          ) {
            setAssigned(false);
          } else {
            setAssigned(true);
            // getting info of all faculties with same designation
            axios
              .get(`http://localhost:8000/api/user/${user.designation}`, config)
              .then((response) => {
                setFaculty(response.data);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Unable to load data");
        });
    }
  }, [user.username, user]);

  // Setting the  new substitute selected
  const handleChange = (e) => {
    setSubstitute({ ...substitute, [e.target.name]: e.target.value });
  };

  const endPoints = [
    {
      // updating student doc with new trainer or placement officer
      url: `http://localhost:8000/api/students/${user.username}/${user.designation}`,
      body: substitute,
    },
    {
      // updationg the course/bach assignrd to the newly assigned faculty
      url: `http://localhost:8000/api/user/${substitute.newFaculty}/${user.designation}`,
      body: substituteInfo.assignement,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .all(
        endPoints.map((endpoint) =>
          axios.put(endpoint.url, endpoint.body, config)
        )
      )
      .then(
        axios.spread((student, faculty) => {
          if (student.data.message === "Updated the student documnents") {
            if (faculty.data.message === "User info updated Successfully") {
              handleDelete();
            } else alert(faculty.data.message);
          } else alert(student.data.message);
        })
      )
      .catch((err) => {
        console.log(err);
        alert("unable to update");
        window.location.reload();
      });
  };

  // deleting the faculty
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/user/${user._id}`, config)
      .then((response) => {
        if (response.data.message === "User deleted successfully") {
          alert(response.data.message);
          window.location.reload();
        } else {
          alert(response.data.message);
          window.location.reload();
        }
      });
  };

  return (
    <Dialog style={{ minWidth: "270px" }} open={open} onClose={handleClose}>
      <DialogTitle>Select Substitute</DialogTitle>
      <DialogContent>
        {assigned ? (
          <Grid overflow="hidden" style={{ width: "90%" }}>
            {/* If the faculty to be deleted has students assigned to him dropdown for selecting the substitute  */}
            <Typography variant="subtitle1" gutterBottom>
              Please selete a substitute for the removing user
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ m: 2 }}
                margin="dense"
                type="text"
                // fullWidth
                required
                name="newFaculty"
                select
                variant="outlined"
                onChange={handleChange}
              >
                {/* Displaying the names of faculties of same designation as the user to be deleted */}
                {faculty.map(
                  (val, i) =>
                    val.username !== user.username && (
                      <MenuItem value={val.username}>{val.name}</MenuItem>
                    )
                )}
              </TextField>
              <DialogActions>
                <Button type="submit">Remove</Button>
              </DialogActions>
            </form>
          </Grid>
        ) : (
          <>
            <DialogContentText>
              {user.name} has not assigned with any student
            </DialogContentText>
            <DialogActions>
              <Button type="submit" onClick={handleDelete}>
                Remove
              </Button>
            </DialogActions>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDeletion;
