import React from "react";
import { Routes, Route } from "react-router";
import RouteComponent from "./RouteComponent";
import Homepage from "../components/Homepage";
import Books from "../components/Books";

const PrivateComponent = () => {
  return (
    <Routes>
      {/* <RouteComponent path="/" element={Homepage} />
      <RouteComponent exact path="/book" element={Books} /> */}
      <Route path="/" element={<Homepage />} />
      <Route exact path="/book" element={<Books />} />
    </Routes>
  );
};

export default PrivateComponent;
