import { CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "./CommonTable";

const CourseDetails = () => {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const endPoints = [
    "http://localhost:8000/api/course",
    "http://localhost:8000/api/batch",
    "http://localhost:8000/api/project",
  ];

  //  getting batch project and course from the db collections using axios.all

  useEffect(() => {
    axios.all(endPoints.map((endpoint) => axios.get(endpoint))).then(
      axios.spread((course, batch, project) => {
        if (
          course.data.message === "Unable to load" ||
          project.data.message === "Unable to load" ||
          batch.data.message === "Unable to load"
        ) {
          navigate("/userinfo");
        } else {
          setCourses(course.data);
          setBatches(batch.data);
          setProjects(project.data);
          setLoading(false);
        }
      })
    );
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ margin: "10% 45%" }}>
          <CircularProgress />
          <h1>Loading</h1>
        </div>
      ) : (
        <Grid
          container
          justifyContent="center"
          spacing={2}
          sx={{ marginTop: "5%" }}
        >
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <CommonTable
              type="Batches"
              typeLabel="batch_name"
              data={batches.map(
                ({ _id, batch_name, start_date, end_date }) => ({
                  id: _id,
                  name: batch_name,
                  start_date: start_date,
                  end_date: end_date,
                })
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={2}>
            <CommonTable
              type="Courses"
              typeLabel="course_name"
              data={courses.map(({ _id, course_name }) => ({
                id: _id,
                name: course_name,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={2}>
            <CommonTable
              type="Projects"
              typeLabel="project_name"
              data={projects.map(({ _id, project_name }) => ({
                id: _id,
                name: project_name,
              }))}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CourseDetails;
