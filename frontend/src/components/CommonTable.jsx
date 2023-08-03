import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  createTheme,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCourseForm from "./AddCourseForm";
import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

// creating transparent button
const theme = createTheme();
const TransparentButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.primary.main,
  border: "none",
  outline: "none",
  cursor: "pointer",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CommonTable = (props) => {
  const [course, setCourse] = useState({});
  const [batch, setBatch] = useState({});
  const [project, setProject] = useState({});
  const navigate = useNavigate();
  let date;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.userRole !== "Admin") {
      // alert("Access denied");
      navigate("/");
    }
  });

  function formatDate(inputDate) {
    const [year, month, day] = inputDate.substring(0, 10).split("-");

    // Pad the day and month with leading zeros if needed
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    return `${formattedDay}-${formattedMonth}-${year}`;
  }

  const handleChange = (e) => {
    if (props.type === "Courses") {
      setCourse({ ...course, [e.target.name]: e.target.value });
    } else if (props.type === "Projects") {
      setProject({ ...project, [e.target.name]: e.target.value });
    } else {
      setBatch({ ...batch, [e.target.name]: e.target.value });
    }
  };

  const deleteHandler = (id) => {
    let endPoint;
    if (props.type === "Courses") {
      endPoint = `http://localhost:8000/api/course/${id}`;
    } else if (props.type === "Projects") {
      endPoint = `http://localhost:8000/api/project/${id}`;
    } else {
      endPoint = `http://localhost:8000/api/batch/${id}`;
    }
    axios
      .delete(endPoint, props.config)
      .then((response) => {
        if (
          response.data.message === "Batch deleted successfully" ||
          response.data.message === "Course deleted successfully" ||
          response.data.message === "Project deleted successfully"
        ) {
          alert(response.data.message);
          window.location.reload();
        } else {
          alert(response.data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let endPoint, data;
    if (props.type === "Courses") {
      endPoint = "http://localhost:8000/api/course";
      // console.log(course);
      data = course;
    } else if (props.type === "Projects") {
      endPoint = "http://localhost:8000/api/project";
      // console.log(project);
      data = project;
    } else {
      endPoint = "http://localhost:8000/api/batch";
      // console.log(batch);
      data = batch;
    }
    // console.log("data", data);
    axios
      .post(endPoint, data, props.config)
      .then((response) => {
        if (
          response.data.message === "Course added successfully" ||
          response.data.message === "Project added successfully" ||
          response.data.message === "Batch added successfully"
        ) {
          alert(response.data.message);
          window.location.reload();
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  };

  return (
    <Paper
      sx={{
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        align="center"
        fontStyle="italic"
        gutterBottom
        sx={{
          color: "#B7527E",
          paddingTop: "15px",
          fontFamily: "Tektur, cursive",
          fontWeight: "500",
        }}
      >
        {props.type}
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  fontSize: "1rem",
                  fontFamily: "Tektur, cursive",
                },
              }}
            >
              <StyledTableCell>NO</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              {props.type === "Batches" && (
                <>
                  <StyledTableCell align="right">Starting Date</StyledTableCell>
                  <StyledTableCell align="right">Ending Date</StyledTableCell>
                </>
              )}
              <StyledTableCell align="right">Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((val, i) => (
              <StyledTableRow key={val.name}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ color: "#B7527E" }}
                >
                  {++i}
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ color: "#B7527E" }}>
                  {val.name}
                </StyledTableCell>
                {props.type === "Batches" && (
                  <>
                    <StyledTableCell align="right" sx={{ color: "#B7527E" }}>
                      {(date = formatDate(val.start_date))}
                    </StyledTableCell>
                    <StyledTableCell align="right" sx={{ color: "#B7527E" }}>
                      {(date = formatDate(val.end_date))}
                    </StyledTableCell>
                  </>
                )}
                <StyledTableCell align="right" sx={{ color: "#B7527E" }}>
                  <ThemeProvider theme={theme}>
                    <Tooltip title="Delete" arrow>
                      <TransparentButton
                      // variant="contained"

                      // onClick={() => {
                      //   deleteHandler(row._id);
                      // }}
                      >
                        <DeleteIcon
                          color="error"
                          onClick={() => {
                            deleteHandler(val.id);
                          }}
                        />
                        {/* Delete */}
                      </TransparentButton>
                    </Tooltip>
                  </ThemeProvider>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {/* adding new course/project/batch  dialogue box code */}
      <Box align="center">
        <Button
          variant="contained"
          sx={{ borderRadius: "25%", backgroundColor: "#671E13" }}
          onClick={handleClickOpen}
        >
          <AddCircleIcon />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add {props.type}</DialogTitle>
          <DialogContent>
            <Grid overflow="hidden">
              <form onSubmit={handleSubmit}>
                <TextField
                  autoFocus
                  sx={{ m: 2 }}
                  margin="dense"
                  id={props.type}
                  label={props.typeLabel}
                  name={props.typeLabel}
                  type="text"
                  fullWidth
                  required
                  variant="standard"
                  onChange={handleChange}
                />
                {props.type === "Batches" && (
                  <>
                    <TextField
                      fullWidth
                      sx={{ m: 2 }}
                      name="start_date"
                      helperText="Batch starting date"
                      type="date"
                      variant="standard"
                      onChange={handleChange}
                      required
                    />
                    <TextField
                      fullWidth
                      sx={{ m: 2 }}
                      name="end_date"
                      helperText="Batch ending date"
                      type="date"
                      variant="standard"
                      required
                      onChange={handleChange}
                    />
                  </>
                )}
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Add</Button>
                </DialogActions>
              </form>
            </Grid>
          </DialogContent>
        </Dialog>
      </Box>
      <br />
    </Paper>
  );
};

export default CommonTable;
