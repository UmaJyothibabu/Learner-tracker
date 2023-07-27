import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import StudentForm from "./components/StudentForm";
import UserForm from "./components/UserForm";
import Login from "./components/Login";
import CourseDetails from "./components/CourseDetails";
import StudentTable from "./components/StudentTable";
import BulkUpload from "./components/BulkUpload"; // Import the BulkUpload component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/userinfo" element={<UserList />} />
      <Route path="/studentTable" element={<StudentTable />} />
      <Route
        path="/userform"
        element={
          <UserForm
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
        }
      />
      <Route path="/courseinfo" element={<CourseDetails />} />
      <Route
        path="/studentform"
        element={
          <StudentForm
            method="post"
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
        }
      />
      <Route path="/bulkupload" element={<BulkUpload />} /> {/* Add BulkUpload component route */}
    </Routes>
  );
}

export default App;
