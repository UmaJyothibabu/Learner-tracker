import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const columns = [
  {
    id: "student_name",
    label: "Name",
    minWidth: 150,
  },
  {
    id: "email_id",
    label: "Email",
    minWidth: 200,
  },
  {
    id: "course",
    label: "Course",
    minWidth: 150,
  },
  {
    id: "project",
    label: "Project",
    minWidth: 150,
  },
  {
    id: "batch",
    label: "Batch",
    minWidth: 100,
  },
  {
    id: "course_status",
    label: "Course-Status",
    minWidth: 150,
  },
  {
    id: "action",
    label: "Update and delete",
    minWidth: 150,
  },
  {
    id: "placement_status",
    label: "Placement-Status",
    minWidth: 150,
  },
  {
    id: "selectStatus",
    label: "Select Status",
    minWidth: 150,
  },
];


const StudentTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [placementStatusMenuAnchor, setPlacementStatusMenuAnchor] = useState(null);
  const [selectedPlacementStatus, setSelectedPlacementStatus] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/students/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
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
      .put(`http://localhost:8000/api/students/${selectedPlacementStatus}`, {
        placement_status: status,
      })
      .then(() => {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === selectedPlacementStatus ? { ...item, placement_status: status } : item
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });

    handlePlacementStatusMenuClose();
  };


  return (
    <div style={{ paddingTop: "100px" }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <h2 className="App fw-bold py-4 fst-italic">Student List</h2>
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
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, backgroundColor: "gray", color: "white" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "white" }}>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column) => {
                        const value = row[column.id];

                        if (column.id === "action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Link to={`/update-student/${row._id}`}>
                                <Button variant="contained" color="secondary" style={{ backgroundColor: "gray" }}>
                                  Update
                                </Button>
                              </Link>
                              <Button
                                variant="contained"
                                color="secondary"
                                style={{ backgroundColor: "gray" }}
                                onClick={() => handleDelete(row._id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          );
                        }

                        if (column.id === "placement_status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        }

                        if (column.id === "selectStatus") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <IconButton
                                color="secondary"
                                style={{ backgroundColor: "#CCCCCC" }}
                                onClick={(event) => handlePlacementStatusMenuOpen(event, row)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                anchorEl={placementStatusMenuAnchor}
                                open={Boolean(placementStatusMenuAnchor && selectedPlacementStatus)}
                                onClose={handlePlacementStatusMenuClose}
                              >
                                <MenuItem onClick={() => handlePlacementStatusSelect("Placed")}>Placed</MenuItem>
                                <MenuItem onClick={() => handlePlacementStatusSelect("Not interested")}>Not Interested</MenuItem>
                                <MenuItem onClick={() => handlePlacementStatusSelect("Jobseeking")}>Job Seeking</MenuItem>
                              </Menu>
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ backgroundColor: "#F2F2F2" }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default StudentTable;