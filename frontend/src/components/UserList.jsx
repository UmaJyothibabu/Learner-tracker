import React from "react";
import {
  Grid,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
  createTheme,
  Tooltip,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import UserDeletion from "./UserDeletion";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const UserList = () => {
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);
  const [add, setAdd] = useState(false);

  const [update, setUpdate] = useState(false); //for checking wheather it is adding new or updating old one
  const navigate = useNavigate();
  const [singleValue, setSingleValue] = useState({}); //for updation form

  const [showUserDeletion, setShowUserDeletion] = useState(false); //for deleting the user calling component userDeletion
  const [rowValue, setRowValue] = useState(); //for deleting the user

  const [userToken, setUserToken] = useState(
    sessionStorage.getItem("userToken")
  );
  const [userRole, setUserRole] = useState(sessionStorage.getItem("role"));

  // creating transparent button
  const theme = createTheme();
  const TransparentButton = styled(Button)(({ theme }) => ({
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: "none",
    outline: "none",
    cursor: "pointer",
  }));

  //setting axios header
  const config = {
    headers: {
      authorization: " Bearer " + userToken,
    },
  };

  // loading User info from db
  useEffect(() => {
    if (userRole !== "Admin") {
      alert("Access denied");
      navigate("/");
    } else {
      axios
        .get("http://localhost:8000/api/user", config)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Unable to load data");
        });
    }
  }, []);

  // performing the deletion
  const deleteHandler = (i) => {
    setShowUserDeletion(true);
    setRowValue(i);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddition = () => {
    setAdd(true);
  };

  let finalJSX = (
    <Grid
      container
      overflow="hidden"
      // justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
      <Grid item xs={11} sm={11} md={11} lg={11}>
        {loading ? (
          <div style={{ margin: "10% 45%" }}>
            <CircularProgress />
            <h1>Loading</h1>
          </div>
        ) : (
          <>
            {userRole === "Admin" && add && (
              <UserForm
                userToken={userToken}
                userRole={userRole}
                method="post"
                data={{
                  name: "",
                  username: "",
                  password: "",
                  confirmpassword: "",
                  email: "",
                  phone: "",
                  designation: "Placement_officer",
                  batch: [],
                  course: [],
                }}
              />
            )}
            {!add && (
              <>
                <Box align="right" sx={{ marginRight: "20px" }} gutterbottom>
                  <Tooltip title="Add" arrow>
                    <PersonAddIcon
                      sx={{
                        height: "50px",
                        width: "50px",
                        color: "#3F708D",
                      }}
                      onClick={handleAddition}
                    />
                  </Tooltip>
                </Box>

                <Paper
                  sx={{
                    width: "98.5%",
                    overflow: "hidden",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <h2 className="App fw-bold py-4 fst-italic">
                    Facuilty Details
                  </h2>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow
                          sx={{
                            "& th": {
                              color: "white",
                              backgroundColor: "#47301F",
                              fontSize: "1.25rem",
                              fontWeight: "bold",
                            },
                          }}
                        >
                          <TableCell align="center" style={{ minWidth: 150 }}>
                            Name
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 100 }}>
                            USERNAME
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 170 }}>
                            Email
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 120 }}>
                            Phone
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 170 }}>
                            Designation
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 80 }}>
                            BATCH/COURSE
                          </TableCell>
                          <TableCell align="center" style={{ minWidth: 170 }}>
                            Update/Delete
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map(
                            (row, i) =>
                              row.designation !== "Admin" && (
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
                                    {row.name}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.05rem",
                                      fontWeight: "bold",
                                      color: "#47301F",
                                    }}
                                    align="center"
                                  >
                                    {row.username}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.05rem",
                                      fontWeight: "bold",
                                      color: "#47301F",
                                    }}
                                    align="center"
                                  >
                                    {row.email}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.05rem",
                                      fontWeight: "bold",
                                      color: "#47301F",
                                    }}
                                    align="center"
                                  >
                                    {row.phone}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "1.05rem",
                                      fontWeight: "bold",
                                      color: "#47301F",
                                    }}
                                    align="center"
                                  >
                                    {row.designation}
                                  </TableCell>
                                  {row.designation === "Training_head" ? (
                                    <TableCell
                                      sx={{
                                        fontSize: "1.05rem",
                                        fontWeight: "bold",
                                        color: "#47301F",
                                      }}
                                      align="center"
                                    >
                                      {row.course.map((val, i) => (
                                        <>
                                          {val}
                                          <br />
                                        </>
                                      ))}
                                    </TableCell>
                                  ) : (
                                    <TableCell
                                      sx={{
                                        fontSize: "1.05rem",
                                        fontWeight: "bold",
                                        color: "#47301F",
                                      }}
                                      align="center"
                                    >
                                      {row.batch.map((val, i) => (
                                        <>
                                          {val}
                                          <br />
                                        </>
                                      ))}
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
                                    <ThemeProvider theme={theme}>
                                      <Tooltip title="Update" arrow>
                                        <TransparentButton
                                          onClick={() => {
                                            updateUser(row);
                                          }}
                                        >
                                          <UpdateIcon
                                            style={{ color: "#335A71" }}
                                          />{" "}
                                          {/* Update */}
                                        </TransparentButton>
                                      </Tooltip>
                                    </ThemeProvider>
                                    &nbsp;
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
                                              // deleteHandler(row._id);
                                              deleteHandler(i);
                                            }}
                                          />
                                          {/* Delete */}
                                          {showUserDeletion &&
                                            rowValue === i && (
                                              <UserDeletion
                                                user={row}
                                                userToken={userToken}
                                                userRole={userRole}
                                              />
                                            )}
                                        </TransparentButton>
                                      </Tooltip>
                                    </ThemeProvider>
                                  </TableCell>
                                </TableRow>
                              )
                          )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    sx={{ backgroundColor: "#E2B179" }}
                    rowsPerPageOptions={[10, 25, 100]}
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

  // for displaying updation form
  const updateUser = (val) => {
    setUpdate(true);
    setSingleValue(val);
  };

  if (update)
    finalJSX = (
      <UserForm
        method="put"
        userToken={userToken}
        userRole={userRole}
        data={singleValue}
      />
    );
  return finalJSX;
};

export default UserList;
