import React, { useContext, useRef, useState } from "react";
import "../css/Login.css";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../Context/AuthContext";
import { CircularProgress } from "@mui/material";
import GoogleLogin from "react-google-login";
import axios from "axios";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const [google, setGoogle] = useState({});
  const [inputPassword, setInputPassword] = useState(false);
  const [errorGoolge, setErrorGoogle] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { username: email.current.value, password: password.current.value },
      dispatch
    );
  };
  const responseGoogle = async (response) => {
    if (
      response.profileObj.email.includes("@student.tdtu.edu.vn") ||
      response.profileObj.email.includes("@tdtu.edu.vn")
    ) {
      setGoogle(response.profileObj);
      setInputPassword(true);
      setErrorGoogle("");
      document.getElementById("input").value = "";
    } else {
      setErrorGoogle("Tài khoản không hợp lệ");
    }
  };

  const handleClickRegister = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        username: google.name,
        authId: google.googleId,
        profilePicture: google.imageUrl,
        email: google.email,
        password: password.current.value,
      };

      const res = await axios.post("auth/register", newUser);
      loginCall(
        { email: google.email, password: password.current.value },
        dispatch
      );
    } catch (err) {
      setErrorGoogle("Tài khoản đã tồn tại vui lòng đăng nhập");
      setTimeout(() => {
        setInputPassword(false);
        document.getElementById("input").value = "";
        setErrorGoogle("");
      }, 2000);
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Social Club</h3>
        </div>
<<<<<<< HEAD
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              className="loginInput"
              type="text"
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
=======
        {inputPassword ? (
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClickRegister}>
              {errorGoolge ? (
                <span className="error">{errorGoolge}</span>
              ) : (
                <span></span>
              )}
              <span>Nhập mật khẩu cho lần đăng nhập sau</span>
              <input
                id="input"
                placeholder="Mật khẩu"
                className="loginInput"
                type="password"
                ref={password}
                minLength="6"
                required
              />
              <button className="loginButton" type="submit">
                Đăng nhập
              </button>
            </form>
          </div>
        ) : (
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              {error ? (
                <span className="error">Sai tài khoản hoặc mật khẩu</span>
              ) : (
                <span></span>
              )}
              {errorGoolge ? (
                <span className="error">{errorGoolge}</span>
              ) : (
                <span></span>
              )}
              <input
                id="input"
                placeholder="Tài khoản"
                className="loginInput"
                type="email"
                ref={email}
                required
              />
              <input
                id="input"
                placeholder="Mật khẩu"
                className="loginInput"
                type="password"
                ref={password}
                minLength="6"
                required
              />
              <button
                className="loginButton"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Đăng nhập"
                )}
              </button>
              <span className="loginForgot">Quên mật khẩu</span>

              <GoogleLogin
                className="googleButton"
                clientId="599340179036-rqs9pg880s4tm4i23db772eg54jvglmf.apps.googleusercontent.com"
                buttonText="Đăng nhập Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </form>
          </div>
        )}
>>>>>>> bda833dbf38ae14e36de0f6f98d04fade67aa4f0
      </div>
    </div>
  );
}
