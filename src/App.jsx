import Navbar from "./components/Navbar";
import React, { useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { theme } from "./theme";

import Profile from "./Page/Profile";
import Login from "./Page/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Page/Home";
import Notification from "./Page/Notification";
import Dashboard from "./Page/Dashboard";
import { AuthContext } from "./Context/AuthContext";
import Falcuty from "./Page/Falcuty";
import AddNotification from "./Page/AddNotification";

function App() {
  const { token, user } = useContext(AuthContext);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={token && user ? <Home /> : <Login />}
          />
          <Route
            path="/profile/:id"
            element={token && user ? <Profile /> : <Login />}
          />
          <Route
            path="/login"
            element={token && user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/notification"
            element={token && user ? <Notification /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={token && user ? <Dashboard /> : <Login />}
          />
          <Route
            exact
            path="/falcuty"
            element={token && user ? <Falcuty /> : <Login />}
          />
          <Route
            exact
            path="/falcuty/notification/add"
            element={token && user ? <AddNotification /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
