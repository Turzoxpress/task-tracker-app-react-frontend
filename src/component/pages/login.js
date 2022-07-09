import React, { useState, Button } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import constants from "../utils/constants";
import axios from "axios";

export default function (props) {
  const navigate = useNavigate();

  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  //--------------------

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const login = () => {
    //----------------

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios({
      method: "post",
      url: constants.backend_server + constants.login,
      headers: {},
      data: {
        email: email,
        password: password,
      },
    })
      .then(function (response) {
        // console.log(response.data);

        // console.log(response.status);

        // //setToDoList(response.data.data);
        // alert(response.data.message);
        // window.location.reload(false);
        //return response;

        if (response.data.message === "Login successful!") {
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("isLoggedIn", true);

          navigateHome();
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        return error;
      });

    //-----------------------------
  };

  //------------------------------------

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={navigateHome}
              >
                Home
              </button>
            </div>
            <h3 className="Auth-form-title">Sign In</h3>
            {/* <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div> */}
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                id="email"
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                id="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" onClick={login}>
                Login
              </button>
            </div>
            {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
