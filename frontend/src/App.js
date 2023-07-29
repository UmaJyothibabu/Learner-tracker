import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import UserList from "./components/UserList";
import StudentForm from "./components/StudentForm";
import UserForm from "./components/UserForm";
import Login from "./components/Login";
import CourseDetails from "./components/CourseDetails";
import StudentTable from "./components/StudentTable";
import BulkUpload from "./components/BulkUpload"; // Import the BulkUpload component
import Main from "./components/Main";
import { useEffect } from "react";

function App() {
  // Get the current location using useLocation hook
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent going back after logging out
  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    if (!userToken) {
      // User is not logged in, redirect to login page
      navigate("/");
    }
  }, [navigate, location]);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/userinfo" element={<Main child={<UserList />} />} />
      <Route path="/studentTable" element={<Main child={<StudentTable />} />} />
      <Route path="/courseinfo" element={<Main child={<CourseDetails />} />} />
      <Route path="/bulkupload" element={<Main child={<BulkUpload />} />} />
      {/* Add BulkUpload component route */}
      {/* You can find  Userform and StudentForm inside UserList and StudentTabled used as components */}
    </Routes>
  );
}

export default App;
