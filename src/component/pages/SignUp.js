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

  const navigateLogin = () => {
    // 👇️ navigate to /
    navigate("/login");
  };

  //--------------------

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const signUp = () => {
    //----------------

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const c_password = document.getElementById("c_password").value;

    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      c_password.length < 1
    ) {
      alert("Please fill all the fields!");
    } else if (password != c_password) {
      alert("'Password' and 'Confirm Password' does not matched!");
    } else if (password.length < 8) {
      alert("Password length must be at least 8 characters long!");
    } else {
      //alert(name + email + password + c_password);
      //--------------------

      setLoading(true);
      axios({
        method: "post",
        url: constants.backend_server + constants.registerNewUser,
        headers: {},
        data: {
          name: name,
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

          if (response.data.status === 200) {
            alert(
              "Registration successful! Please login and contact with your admin to provide you necessary permissions!"
            );

            navigateLogin();
          } else {
            alert(response.data.message);
          }

          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          return error;
        });

      //--------------------------------------
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
            <form className="Auth-form">
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Registration</h3>
                {/* <div className="text-center">
                Already registered?{" "}
                <span className="link-primary" onClick={navigateLogin}>
                  Registration
                </span>
              </div> */}
                <div className="form-group mt-3">
                  <label>Full Name</label>
                  <input
                    id="name"
                    type="text"
                    className="form-control mt-1"
                    placeholder="e.g Jane Doe"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control mt-1"
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control mt-1"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Confirm Password</label>
                  <input
                    id="c_password"
                    type="password"
                    className="form-control mt-1"
                    placeholder="Password"
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button
                    type="button"
                    onClick={signUp}
                    className="btn btn-primary"
                  >
                    Register
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
