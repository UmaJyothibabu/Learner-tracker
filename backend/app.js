const express = require("express");
const app = express();
const cors = require("cors");

const morgan = require("morgan");
require("dotenv").config();
require("./connection/mongodb");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;

// Requiring all routes
const userApi = require("./Routes/users");
const courseApi = require("./Routes/courses");
const batchApi = require("./Routes/batches");
const projectApi = require("./Routes/projects");
const studentApi = require("./Routes/students"); // New route for students

app.use("/api", userApi);
app.use("/api", courseApi);
app.use("/api", batchApi);
app.use("/api", projectApi);
app.use("/api", studentApi); // Mounting the student route

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
