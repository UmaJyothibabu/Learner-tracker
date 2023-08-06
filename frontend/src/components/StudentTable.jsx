import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Grid,
  CircularProgress,
  createTheme,
  ThemeProvider,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import StudentForm from "./StudentForm";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const theme = createTheme();
const TransparentButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.primary.main,
  border: "none",
  outline: "none",
  cursor: "pointer",
}));

const StudentTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [singleValue, setSingleValue] = useState({});
  const [add, setAdd] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [placementStatusMenuAnchor, setPlacementStatusMenuAnchor] =
    useState(null);
  const [selectedPlacementStatus, setSelectedPlacementStatus] = useState(null);
  let [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(
    sessionStorage.getItem("userToken")
  );
  const [userRole, setUserRole] = useState(sessionStorage.getItem("role"));
  const [username, setusername] = useState(sessionStorage.getItem("username"));

  const config = {
    headers: {
      authorization: " Bearer " + userToken,
    },
  };

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_DEV;

  useEffect(() => {
    if (
      userRole === "Admin" ||
      userRole === "Training_head" ||
      userRole === "Placement_officer"
    ) {
      // if admin is logged in full student in collection is fetched
      if (userRole === "Admin") {
        axios
          .get(`${API_URL}/students`, config)
          .then((response) => {
            if(response.data.message=== "No Students Added Yet")
           {
            alert(response.data.message)
           }
           else{
            setData(response.data);
           }
            // console.log(response.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // if trainer or placement officer is logged in only students assigned to them are fetched
        axios
          .get(`${API_URL}/students/${username}/${userRole}`, config)
          .then((response) => {
            if (response.data.message=== "This faculty is not assigned with any student")
            {
              alert(response.data.message)
              setLoading(false);
            }
            else{
            setData(response.data);
            }
            // console.log(response.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      alert("Access denied");
      navigate("/");
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlePlacementStatusMenuOpen = (event, rowData) => {
    setPlacementStatusMenuAnchor(event.currentTarget);
    setSelectedPlacementStatus(rowData._id);
  };

  const handlePlacementStatusMenuClose = () => {
    setPlacementStatusMenuAnchor(null);
  };

  const handlePlacementStatusSelect = (status) => {
    axios
      .put(
        `${API_URL}/students/${selectedPlacementStatus}`,
        {
          placement_status: status,
        },
        config
      )
      .then(() => {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === selectedPlacementStatus
              ? { ...item, placement_status: status }
              : item
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });

    handlePlacementStatusMenuClose();
  };

  // Deleting student
  const deleteHandler = (id) => {
    axios
      .delete(`${API_URL}/students/${id}`, config)
      .then((response) => {
        if (response.data.message === "Student deleted successfully") {
          alert(response.data.message);
          window.location.reload();
        } else if (response.data.message === "Unauthorised user") {
          alert(response.data.message);
          navigate("/");
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to delete");
      });
  };

  const handleAddition = () => {
    setAdd(true);
  };

  let finalJsx = (
    <Grid
      container
      // overflow="hidden"
      justifyContent="center"
      alignItems="center"
      sx={{
        paddingTop: "15vh",
        paddingBottom: "7vh",
        backgroundColor: "#cecce0",
      }}
    >
      <Grid item xs={12} sm={12} md={12} lg={userRole === "Admin" ? 12 : 10}>
        {loading ? (
          <div style={{ margin: "10% 45%" }}>
            <CircularProgress />
            <h1>Loading</h1>
          </div>
        ) : (
          <>
            {(userRole === "Admin" || userRole === "Training_head") && add && (
              <StudentForm
                method="post"
                userRole={userRole}
                userToken={userToken}
                username={username}
                data={{
                  student_name: "",
                  email_id: "",
                  phone: "",
                  course: [],
                  batch: [],
                  project: "",
                  course_status: "",
                  placement_status: "",
                  training_head: "",
                  placement_officer: "",
                  student_address: {
                    address: "",
                    district: "",
                    state: "",
                    pin: "",
                  },
                }}
              />
            )}
            {!add && (
              <>
                <Paper elevation={6} sx={{ width: "98%", marginLeft: "1%" }}>
                  <Box align="right" sx={{ marginRight: "20px" }}>
                    <Grid container>
                      <Grid item xs={11} sm={11} md={11} lg={11}>
                        <Typography
                          variant="h4"
                          align="center"
                          sx={{
                            color: "#11425f",
                            padding: "20px 0",
                            fontStyle: "italic",
                            fontFamily: "Tektur, cursive",
                            fontWeight: "500",
                          }}
                        >
                          STUDENT DETAILS
                        </Typography>
                      </Grid>
                      {(userRole === "Admin" ||
                        userRole === "Training_head") && (
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                          <Tooltip title="Add" arrow>
                            <PersonAddIcon
                              sx={{
                                height: "40px",
                                width: "40px",
                                color: "#3F708D",
                              }}
                              onClick={handleAddition}
                            />
                          </Tooltip>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                  <TableContainer sx={{ maxHeight: 450 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow
                          sx={{
                            "& th": {
                              color: "white",
                              backgroundColor: "#5F2E11",
                              fontSize: "1.25rem",
                              fontFamily: "Tektur, cursive",
                              // fontWeight: "bold",
                            },
                          }}
                        >
                          <TableCell align="center" style={{ minWidth: 140 }}>
                            Name
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 80 }}>
                            Course
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 90 }}>
                            Batch
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 80 }}>
                            Project
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 120 }}>
                            Course status
                          </TableCell>
                          {userRole === "Admin" && (
                            <>
                              <TableCell
                                align="center"
                                style={{ minWidth: 130 }}
                              >
                                Training Head
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ minWidth: 130 }}
                              >
                                Placement officer
                              </TableCell>
                            </>
                          )}
                          <TableCell align="center" style={{ minWidth: 110 }}>
                            Placement Status
                          </TableCell>
                          {(userRole === "Placement_officer" ||
                            userRole === "Admin") && (
                            <TableCell align="center" style={{ minWidth: 50 }}>
                              Update Status
                            </TableCell>
                          )}
                          {(userRole === "Admin" ||
                            userRole === "Training_head") && (
                            <TableCell align="center" style={{ minWidth: 80 }}>
                              Update/Delete
                            </TableCell>
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, i) => (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={i}
                            >
                              <TableCell
                                sx={{
                                  fontSize: "1.05rem",
                                  fontWeight: "bold",
                                  color: "#47301F",
                                }}
                                align="center"
                              >
                                {row.student_name}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "1.05rem",
                                  fontWeight: "bold",
                                  color: "#47301F",
                                }}
                                align="center"
                              >
                                {row.course}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "1.05rem",
                                  fontWeight: "bold",
                                  color: "#47301F",
                                }}
                                align="center"
                              >
                                {row.batch}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "1.05rem",
                                  fontWeight: "bold",
                                  color: "#47301F",
                                }}
                                align="center"
                              >
                                {row.project}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "1.05rem",
                                  fontWeight: "bold",
                                  color: "#47301F",
                                }}
                                align="center"
                              >
                                {row.course_status}
                              </TableCell>
                              {userRole === "Admin" && (
                                <TableCell
                                  sx={{
                                    fontSize: "1.05rem",
                                    fontWeight: "bold",
                                    color: "#47301F",
                                  }}
                                  align="center"
                                >
                                  {row.training_head.name}
                                </TableCell>
                              )}
                              {userRole === "Admin" && (
                                <TableCell
                                  sx={{
                                    fontSize: "1.05rem",
                                    fontWeight: "bold",
                                    color: "#47301F",
                                  }}
                                  align="center"
                                >
                                  {row.placement_officer.name}
                                </TableCell>
                              )}
                              <TableCell
                                sx={{
                                  fontSize: "1.05rem",
                                  fontWeight: "bold",
                                  color: "#47301F",
                                }}
                                align="center"
                              >
                                {row.placement_status}
                              </TableCell>
                              {(userRole === "Admin" ||
                                userRole === "Placement_officer") && (
                                <TableCell
                                  sx={{
                                    fontSize: "1.05rem",
                                    fontWeight: "bold",
                                    color: "#47301F",
                                  }}
                                  align="center"
                                >
                                  <IconButton
                                    color="secondary"
                                    style={{ backgroundColor: "#CCCCCC" }}
                                    onClick={(event) =>
                                      handlePlacementStatusMenuOpen(event, row)
                                    }
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                  <Menu
                                    anchorEl={placementStatusMenuAnchor}
                                    open={Boolean(
                                      placementStatusMenuAnchor &&
                                        selectedPlacementStatus
                                    )}
                                    onClose={handlePlacementStatusMenuClose}
                                  >
                                    <MenuItem
                                      onClick={() =>
                                        handlePlacementStatusSelect("Placed")
                                      }
                                    >
                                      Placed
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        handlePlacementStatusSelect(
                                          "Not interested"
                                        )
                                      }
                                    >
                                      Not Interested
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        handlePlacementStatusSelect(
                                          "Jobseeking"
                                        )
                                      }
                                    >
                                      Job Seeking
                                    </MenuItem>
                                  </Menu>
                                </TableCell>
                              )}
                              {(userRole === "Admin" ||
                                userRole === "Training_head") && (
                                <TableCell
                                  sx={{
                                    fontSize: "1.05rem",
                                    fontWeight: "bold",
                                    color: "#47301F",
                                  }}
                                  align="center"
                                >
                                  <ThemeProvider theme={theme}>
                                    <Tooltip title="Update" arrow>
                                      <TransparentButton
                                        onClick={() => {
                                          updateStudent(row);
                                        }}
                                      >
                                        <UpdateIcon
                                          style={{ color: "#335A71" }}
                                        />
                                      </TransparentButton>
                                    </Tooltip>
                                  </ThemeProvider>
                                  &nbsp;
                                  <ThemeProvider theme={theme}>
                                    <Tooltip title="Delete" arrow>
                                      <TransparentButton
                                        // variant="contained"
                                        onClick={() => {
                                          deleteHandler(row._id);
                                        }}
                                      >
                                        <DeleteIcon color="error" />
                                      </TransparentButton>
                                    </Tooltip>
                                  </ThemeProvider>
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    sx={{ backgroundColor: "#F2F2F2" }}
                    rowsPerPageOptions={[5, 10, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );

  const updateStudent = (val) => {
    // console.log(val);
    setUpdate(true);
    setSingleValue(val);
  };

  if (update)
    finalJsx = (
      <StudentForm
        method="put"
        userRole={userRole}
        userToken={userToken}
        username={username}
        data={singleValue}
      />
    );

  return finalJsx;
};

export default StudentTable;
