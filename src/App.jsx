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
          <Route path="/notification" element={<Notification />} />
          <Route
            path="/dashboard"
            element={token && user ? <Navigate to="/" /> : <Dashboard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
