import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import constants from "../utils/constants";

import axios from "axios";

import data from "../assets/data.json";

import ToDoList from "./ToDoList";

export default function () {
  const navigate = useNavigate();

  const navigateLogin = () => {
    // 👇️ navigate to /
    navigate("/login");
  };

  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState(data);

  React.useEffect(() => {
    axios({
      method: "get",
      url: constants.backend_server + constants.getAllTasksStatus + "/created",
      headers: {},
    })
      .then(function (response) {
        console.log(response.data);

        // console.log(response.status);

        // //setToDoList(response.data.data);
        // alert(response.data.message);
        // window.location.reload(false);
        //return response;

        if (response.data.status === 200) {
          // alert(response.data.count);
          setTasks(response.data.data);
          // alert(tasks);
          console.log(tasks);
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        return error;
      });
  }, []);

  const handleToggle = (id) => {};

  const handleDelete = (id) => {};

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={navigateLogin}
        >
          Login
        </button>
      </div>
      <div>
        <ToDoList
          toDoList={tasks}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
