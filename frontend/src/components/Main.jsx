import React, { useState } from "react";
import Navbar from "./Navbar";

const Main = (props) => {
  const [userToken, setUserToken] = useState(
    sessionStorage.getItem("userToken")
  );
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [userRole, setUserRole] = useState(sessionStorage.getItem("role"));
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  return (
    <>
      <Navbar userRole={userRole} userToken={userToken} userId={userId} />
      {props.child}
    </>
  );
};

export default Main;
