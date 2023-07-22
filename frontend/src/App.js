
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import StudentForm from "./components/StudentForm"; // Added the StudentForm component
import MultipleSelectChip from "./components/Test";

function App() {
  return (
    <Routes>
      <Route path="/userinfo" element={<UserList />} />
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
              designation: "",
              batch: [],
              course: [],
            }}
          />
        }
      />
      <Route
        path="/studentform"
        element={
          <StudentForm
            method="post"
            data={{
              student_name: "",
              email_id: "",
              phone: "",
              course: "",
              batch: "",
              project: "",
              course_status: "",
              placement_status: "",
              training_head: "",
              placement_officer: "",
            }}
          />
        }
      />
      <Route path="/test" element={<MultipleSelectChip />} />
    </Routes>
  );
}

export default App;
