const express = require("express");
const app = new express();

const morgan = require("morgan");
require("dotenv").config();
require("./connection/mongodb");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;

// requiring all routes
const userApi = require("./Routes/users");
app.use("/api", userApi);

const courseApi = require("./Routes/courses");
app.use("/api", courseApi);

const batchApi = require("./Routes/batches");
app.use("/api", batchApi);

const projecthApi = require("./Routes/projects");
app.use("/api", projecthApi);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
