import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { fetchUser } from "./utility/fetchUser";

import { useEffect } from "react";
import { gapi } from "gapi-script";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = fetchUser();

    if (!user) navigate("/login");
  }, []);

  const routes = useRoutes([
    { path: "/*", element: <Home /> },
    { path: "/login", element: <Login /> },
  ]);
  return routes;
};

export default App;
