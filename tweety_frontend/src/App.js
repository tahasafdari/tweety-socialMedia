import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";

import { useEffect } from "react";
import { gapi } from "gapi-script";

const App = () => {
  const routes = useRoutes([
    { path: "/*", element: <Home /> },
    { path: "/login", element: <Login /> },
  ]);
  return routes;
};

export default App;
