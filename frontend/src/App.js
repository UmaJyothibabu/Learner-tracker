import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
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
      <Route path="/test" element={<MultipleSelectChip />} />
    </Routes>
  );
}

export default App;
