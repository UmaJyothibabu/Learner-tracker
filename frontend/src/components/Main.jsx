import React from "react";
import Navbar from "./Navbar";

const Main = (props) => {
  return (
    <>
      <Navbar />
      {props.child}
    </>
  );
};

export default Main;
