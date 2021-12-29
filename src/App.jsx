import React, { useContext, useEffect, useState } from "react";

import Profile from "./Page/Profile";
import Login from "./Page/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Page/Home";
import Notification from "./Page/Notification";
import Dashboard from "./Page/Dashboard";
import { AuthContext } from "./Context/AuthContext";
import Falcuty from "./Page/Falcuty";
import AddNotification from "./Page/AddNotification";
<<<<<<< HEAD

function App() {
  const { token, user } = useContext(AuthContext);
  
  return (
    <>
    <div> 
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={token && user ? <Home /> : <Login/>}
          />
          <Route
            path="/profile/:id"
            element={token && user ? <Profile /> : <Login/>}
          />
          <Route
            path="/login"
            element={token && user ? <Navigate to="/" /> : <Login/>}
          />
          <Route
            path="/notification"
            element={token && user ? <Notification /> : <Login/>}
          />
          <Route
            path="/dashboard"
            element={token && user ? <Dashboard /> : <Login/>}
          />
          <Route
            exact
            path="/falcuty"
            element={token && user ? <Falcuty /> : <Login/>}
          />
          <Route
            exact
            path="/falcuty/notification/add"
            element={token && user ? <AddNotification /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
=======
import io from "socket.io-client";
import ListNotification from "./Page/ListNotification";
import Noti from "./Page/Noti";
import NotificationDetail from "./Page/NotificationDetail";
import ErrorPage from "./components/ErrorPage";

function App() {
  const { token, user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    if (!socket && token && user) {
      const newSocket = io("http://localhost:5000", {
        query: { token },
        transports: ["websocket"],
      });
      newSocket.on("connect", () => {
        console.log("Connected");
      });
      newSocket.on("disconect", () => {
        setSocket(null);
      });
      setSocket(newSocket);
    }
  };
  useEffect(() => {
    setupSocket();
  }, []);
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                token && user ? (
                  <Home socket={socket} />
                ) : (
                  <Login setupSocket={setupSocket} />
                )
              }
            />
            <Route
              path="/profile/:id"
              element={
                token && user ? (
                  <Profile />
                ) : (
                  <Login setupSocket={setupSocket} />
                )
              }
            />
            <Route
              path="/login"
              element={
                token && user ? (
                  <Navigate to="/" />
                ) : (
                  <Login setupSocket={setupSocket} />
                )
              }
            />
            <Route
              path="/notification"
              element={
                token && user ? (
                  <Notification />
                ) : (
                  <Login setupSocket={setupSocket} />
                )
              }
            />
            <Route
              path="/notification/:slug"
              element={
                token && user ? (
                  <ListNotification />
                ) : (
                  <Login setupSocket={setupSocket} />
                )
              }
            />
            <Route
              path="/notification/noti/:id"
              element={
                token && user ? (
                  <NotificationDetail />
                ) : (
                  <Login setupSocket={setupSocket} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                token && user ? (
                  <Dashboard />
                ) : (
                  <Login setupSocket={setupSocket} />
                )
              }
            />
            <Route
              path="/falcuty"
              element={
                token && user ? (
                  <Falcuty />
                ) : (
                  <Login setupSocket={setupSocket} />
                )
              }
            />
            <Route
              path="/falcuty/notification/add"
              element={
                token && user ? (
                  <AddNotification socket={socket} />
                ) : (
                  <Login setupSocket={setupSocket} />
                )
              }
            />
            <Route
              path="*"
              element={<ErrorPage string="Trang không tồn tại" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
>>>>>>> 4d804319a2000c33df950cbb3b27af22e0167f4e
    </>
  );
}

export default App;
