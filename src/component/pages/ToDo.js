import React from "react";
import CloseButton from "react-bootstrap/CloseButton";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const ToDo = ({ todo, handleToggle, handleDelete, isLoggedIn }) => {
  // console.log("isLoggedIn value ToDo : " + isLoggedIn);

  const handleClick = (id) => {
    // e.preventDefault();
    handleToggle(todo._id + "_" + id.value);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    handleDelete(e.currentTarget.id);
  };

  const options = ["created", "working", "completed"];
  let defaultOption = options[0];

  for (let i = 0; i < options.length; i++) {
    if (todo.status === options[i]) {
      defaultOption = options[i];
      break;
    }
  }

  // const handleStatusChanged = (e) => {
  //   e.preventDefault();
  //   alert(id.value);
  //   //alert(document.getElementById("statusChanger").value);
  // };

  return (
    <div className="center_div custom_div_center">
      <p
        id={todo._id + "_" + todo.status}
        key={todo._id + todo.task_name}
        name="todo"
        value={todo.task_name}
        // className={todo.status === "completed" ? "todo strike" : "todo"}
        className="todo"
      >
        {todo.task_name}
      </p>

      {isLoggedIn ? (
        <div>
          <div>
            <Dropdown
              className="m-2"
              options={options}
              value={defaultOption}
              placeholder="Select an option"
              onChange={handleClick}
            />
          </div>
          <div>
            <button
              className={"close_button"}
              id={todo._id}
              onClick={handleDeleteClick}
            >
              X
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {/* <div className="bg-dark p-2">
        <CloseButton
          id={todo._id}
          className={"close_button"}
          variant="red"
          onClick={handleDeleteClick}
        />
      </div> */}
    </div>
  );
};

export default ToDo;
