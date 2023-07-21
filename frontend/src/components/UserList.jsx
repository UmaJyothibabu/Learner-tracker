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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [singleValue, setSingleValue] = useState([]);

  // creating transparent button
  const theme = createTheme();
  const TransparentButton = styled(Button)(({ theme }) => ({
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: "none",
    outline: "none",
    cursor: "pointer",
  }));

  // loading User info from db
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to load data");
      });
  }, []);

  // performing the deletion
  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8000/api/user/${id}`)
      .then((response) => {
        if (response.data.message === "User deleted successfully") {
          alert(response.data.message);
          console.log("deleted");

          window.location.reload();
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
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
  return (
    <Grid
      container
      justifyContent="center"
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
          <Paper
            sx={{
              width: "98.5%",
              overflow: "hidden",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <h2 className="App fw-bold py-4 fst-italic">Facuilty Details</h2>
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
                <TableBody sx={{ backgroundColor: "#F1DABF" }}>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
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
                                // onClick={() => {
                                //   updateEmployee(row);
                                // }}
                                >
                                  <UpdateIcon style={{ color: "#335A71" }} />{" "}
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
                                      deleteHandler(row._id);
                                    }}
                                  />
                                  {/* Delete */}
                                </TransparentButton>
                              </Tooltip>
                            </ThemeProvider>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
        )}
      </Grid>
    </Grid>
  );
};

export default UserList;
