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
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    isLoggedIn = false;
  }

  const [tasks, setTasks] = useState(data);

  let taskStatus = localStorage.getItem("taskStatus");
  if (!taskStatus) {
    taskStatus = "working";
  }

  console.log("Tasks status : " + taskStatus);

  React.useEffect(() => {
    axios({
      method: "get",
      url:
        constants.backend_server +
        constants.getAllTasksStatus +
        "/" +
        taskStatus,
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

  const handleToggle = (id) => {
    // alert(id);
    // return;
    let parts = id.split("_");
    let tempStatus = "created";
    // if (parts[1] === "created") {
    //   tempStatus = "completed";
    // }

    // console.log("Previous status : " + parts[1]);
    // console.log("Current status : " + tempStatus);

    //-----------------

    axios({
      method: "post",
      url: constants.backend_server + constants.changeTask,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        id: parts[0],
        status: parts[1],
        modified_by: name,
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
    axios({
      method: "post",
      url: constants.backend_server + constants.deleteTask,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        id: id,
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

  const handleLogout = (id) => {
    localStorage.clear();
    window.location.reload(false);
  };

  const handleWorkingButtonClick = () => {
    localStorage.setItem("taskStatus", "working");
    window.location.reload(false);
  };

  const handleToDoButtonClick = () => {
    localStorage.setItem("taskStatus", "created");
    window.location.reload(false);
  };

  const handleCompletedButtonClick = () => {
    localStorage.setItem("taskStatus", "completed");
    window.location.reload(false);
  };

  const handleDeletedButtonClick = () => {
    localStorage.setItem("taskStatus", "deleted");
    window.location.reload(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Welcome {name}</p>

          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <br></br>

      {/* <div>
        <Dropdown
          id="statusChanger"
          options={options}
          value={defaultOption}
          onChange={handleStatusChanged}
          placeholder="Select an option"
        />
      </div> */}

      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={navigateLogin}
        >
          Login
        </button>
      </div>

      <div>
        <button
          type="button"
          className="btn btn-warning m-2"
          onClick={handleWorkingButtonClick}
        >
          Working
        </button>

        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={handleToDoButtonClick}
        >
          ToDo
        </button>

        <button
          type="button"
          className="btn btn-success m-2"
          onClick={handleCompletedButtonClick}
        >
          Completed
        </button>

        {isLoggedIn ? (
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={handleDeletedButtonClick}
          >
            Deleted
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <ToDoList
          toDoList={tasks}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
}
