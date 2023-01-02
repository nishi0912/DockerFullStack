import React from "react";
import { Routes, Switch, BrowserRouter as Router, Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import PrivateRoutes from "../components/PrivateRoutes";
import RouteComponent from "../components/RouteComponent";
import Homepage from "../components/Homepage";
import Books from "../components/Books";
import "../../assets/stylesheets/application.css";
import ViewBook from "./ViewBook";
import Documents from "./Documents";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/book" element={<Books />} />
      <Route exact path="/book/:slug" element={<ViewBook />} />
      <Route exact path="/documents" element={<Documents />} />
    </Routes>
  );
};

export default App;
