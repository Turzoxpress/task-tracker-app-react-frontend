import React, { useState, Button } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import constants from "../utils/constants";
import axios from "axios";

import Navbar from "./NavBar";

import MoonLoader from "react-spinners/MoonLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
  marginTop: 50,
};

export default function (props) {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#07b428");

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

  // document.getElementById("email").value = temp_email;
  // document.getElementById("password").value = temp_password;

  const login = () => {
    //----------------

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email.length < 1 || password.length < 1) {
      alert("Please enter your email & password!");
    } else {
      localStorage.setItem("temp_email", email);
      localStorage.setItem("temp_password", password);

      setLoading(true);
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
            localStorage.setItem("role", response.data.role);

            navigateHome();
          } else {
            alert(response.data.message);
          }

          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          return error;
        });
    }

    //-----------------------------
  };

  //------------------------------------

  return (
    <div className="sweet-loading">
      {loading ? (
        <MoonLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
        />
      ) : (
        <div>
          <div>
            <Navbar />
          </div>
          <br></br>
          <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
              <div className="Auth-form-content">
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={login}
                  >
                    Log In
                  </button>
                </div>
                {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
