import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const BulkUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [userToken, setUserToken] = useState(
    sessionStorage.getItem("userToken")
  );

  const config = {
    headers: {
      authorization: "Bearer " + userToken,
    },
  };

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_DEV;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please choose a file to upload.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setLoading(true);

    const formData = new FormData();
    formData.append("csvFile", file);

    if (file.size === 0) {
      setError("The uploaded file is empty.");
      setLoading(false);
      return;
    }

    axios
      .post(`${API_URL}/bulk-upload`, formData, config)
      .then((response) => {
        console.log(response.data);

        setLoading(false);
        setSuccessMessage(response.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.log("Error uploading the file:", error.response.data.error);
          setError(error.response.data.error);
          setLoading(false);
        } else {
          setLoading(false);
          setError("Error uploading the file. Please try again.");
          console.log(error);
          window.location.reload();
        }
      });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", backgroundColor: "#cecce0" }}
    >
      <Grid item xs={12} sm={10} md={8} lg={4}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "#11425f",
              fontFamily: "Tektur, cursive",
              fontWeight: "500",
            }}
          >
            BULK UPLOAD STUDENTS
          </Typography>
          <input
            type="file"
            id="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file">
            <Button
              variant="contained"
              component="span"
              color="secondary"
              startIcon={<CloudUploadIcon />}
            >
              Choose File
            </Button>
          </label>
          <br />
          {file && <Typography variant="body1">{file.name}</Typography>}
          {error && (
            <Typography variant="body1" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography variant="body1" sx={{ color: "green" }} gutterBottom>
              {successMessage}
            </Typography>
          )}
          {loading ? (
            <CircularProgress style={{ margin: "10px" }} />
          ) : (
            <Button variant="contained" color="primary" onClick={handleUpload}>
              Upload
            </Button>
          )}
          <br />
          {/* <Button
            variant="contained"
            onClick={() => {
              navigate("/studentTable");
            }}
          >
            Back to Student List
          </Button> */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BulkUpload;
