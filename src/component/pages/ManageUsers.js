import React, { useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import constants from "../utils/constants";
import axios from "axios";

import data2 from "../assets/data2.json";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import User from "./User";
import Navbar from "./NavBar";

export default function () {
  const navigate = useNavigate();

  const [users, setUsers] = useState(data2);

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let role = localStorage.getItem("role");

  if (!isLoggedIn) {
    isLoggedIn = false;
  }

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigateHome();
    } else {
      axios({
        method: "get",
        url: constants.backend_server + constants.getAllUsers,
        headers: { Authorization: `Bearer ${token}` },
        data: {},
      })
        .then(function (response) {
          console.log(response.data);

          // console.log(response.status);

          // //setToDoList(response.data.data);
          // alert(response.data.message);
          // window.location.reload(false);
          //return response;

          if (response.data.status === 200) {
            //alert(response.data.count);

            setUsers(response.data.data);

            // alert(tasks);
            console.log(response.data.data);
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          return error;
        });
    }
  }, []);

  const handleToggle = (id) => {
    // alert(id);
    // return;
    let parts = id.split("_");

    //-----------------

    axios({
      method: "post",
      url: constants.backend_server + constants.updateUserRole,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        user_id: parts[0],
        role: parts[1],
      },
    })
      .then(function (response) {
        console.log(response.data);

        //setToDoList(response.data.data);

        // window.location.reload(false);
        //return response;

        if (
          response.data.status === 403 ||
          response.data.status === 501 ||
          response.data.status === 401
        ) {
          alert(
            "You do not have permission to do this request! Please login again."
          );
        } else {
          if (response.data.status === 200) {
            //window.location.reload(false);
            alert(response.data.message);
            window.location.reload(false);
            //document.getElementById(id).style.visibility = "hidden";
          } else {
            alert(response.data.message);
          }
        }
      })
      .catch(function (error) {
        return error;
      });
  };

  const handleDelete = (id) => {
    //------- Delete confirmation
    alert(id);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <br></br>
      <br></br>
      <div className="custom_div_center">
        {users.map((user) => {
          return (
            <User
              user={user}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              isLoggedIn={isLoggedIn}
              role={role}
            />
          );
        })}
        {/* <button style={{ margin: "20px" }} onClick={handleFilter}>
        Clear Completed
      </button> */}
      </div>
    </div>
  );
}
