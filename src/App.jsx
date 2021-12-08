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
  const { user } = useContext(AuthContext);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route path="/profile/:id" element={user ? <Profile /> : <Login />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/notification" element={<Notification />} />
          <Route
            path="/dashboard"
            element={user ? <Navigate to="/" /> : <Dashboard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
