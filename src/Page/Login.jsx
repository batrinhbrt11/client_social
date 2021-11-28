import React, { useContext, useRef } from "react";
import "../css/Login.css";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../Context/AuthContext";
import { CircularProgress } from "@mui/material";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Social Club</h3>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              ref={password}
              minLength="6"
              required
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? <CircularProgress color="inherit" /> : "Đăng nhập"}
            </button>
            <span className="loginForgot">Quên mật khẩu</span>
            <button className="googleButton">
              {isFetching ? <CircularProgress color="inherit" /> : "Google"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
