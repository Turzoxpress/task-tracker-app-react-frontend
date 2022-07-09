import React from "react";
import CloseButton from "react-bootstrap/CloseButton";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const ToDo = ({ todo, handleToggle, handleDelete, isLoggedIn }) => {
  // console.log("isLoggedIn value ToDo : " + isLoggedIn);

  const my_id = todo._id;
  const handleClick = (e) => {
    e.preventDefault();

    let select = document.getElementById(my_id);
    let option = select.options[select.selectedIndex].text;

    let tempVar = option.toLowerCase();
    if (tempVar === "todo") {
      tempVar = "created";
    }

    handleToggle(my_id + "_" + tempVar);
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
    <div>
      <div>
        <div className="card m-5">
          <div className="card-body">
            <div className="right_button_align">
              <div className="drop_down_div m-2">
                {/* <label for="input-select">Example Select</label> */}
                <select
                  className="form-control"
                  id={my_id}
                  options={options}
                  value={defaultOption}
                  onChange={handleClick}
                >
                  <option value={options[0]}>ToDo</option>
                  <option value={options[1]}>Working</option>
                  <option value={options[2]}>Completed</option>
                </select>
              </div>
            </div>

            <h3 className="card-title card_title">{todo.task_name}</h3>
            <p className="card-text card_title">{todo.task_description}</p>

            <div className="card-footer d-flex text-muted">
              <p>Created By: {todo.created_by}</p>
              <p>Modified By: {todo.modified_by}</p>
              <p>Created On: {todo.created_at}</p>
              <p>Status: {todo.status}</p>
              <p>Completed Time: {todo.created_at}</p>
            </div>

            <div className="right_button_align">
              <a href="#" className="btn btn-danger">
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="center_div custom_div_center">
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
      </div> */}
    </div>
  );
};

export default ToDo;
