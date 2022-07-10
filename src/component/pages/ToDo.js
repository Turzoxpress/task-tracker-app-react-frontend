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

  let today = new Date(todo.created_at);
  let modifiedDate = today.toLocaleString("en-US");
  console.log(modifiedDate);

  let modifiedBy = "NA";
  if (todo.created_by) {
    modifiedBy = todo.created_by;
  }

  let workingStatus = "NA";
  let statusTextClass = "text-secondary";
  if (todo.status) {
    if (todo.status === "created") {
      workingStatus = "ToDo";
      statusTextClass = "text-primary";
    } else if (todo.status === "working") {
      workingStatus = "In Progress";
      statusTextClass = "text-warning";
    } else if (todo.status === "completed") {
      workingStatus = "Completed";
      statusTextClass = "text-success";
    } else if (todo.status === "deleted") {
      workingStatus = "Deleted";
      statusTextClass = "text-danger";
    }
  }

  console.log("status : " + workingStatus);

  return (
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="card m-3 shadow bg-white">
          <p className="card_id_p">
            <i>{"ID: " + todo._id}</i>
          </p>

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

            <h3 className="card-title card_title p-2">
              <b>{todo.task_name}</b>
            </h3>
            <p className="card-text card_title p-2 card_description_p">
              {todo.task_description}
            </p>

            <div class="footer_div_custom">
              <div class="row">
                <div class="col-sm">
                  <p className="footer_div_p footer_text_size  p-2 rounded">
                    <bold className="footer_div_title_text">Created On: </bold>
                    {modifiedDate}
                  </p>
                </div>

                <div class="col-sm">
                  <p className="footer_div_p footer_text_size  p-2 rounded">
                    <bold className="footer_div_title_text">Created By: </bold>
                    {todo.created_by}
                  </p>
                </div>

                <div class="col-sm">
                  <p className="footer_div_p footer_text_size  p-2 rounded">
                    <bold className="footer_div_title_text">Modified By: </bold>
                    {modifiedBy}
                  </p>
                </div>

                <div class="col-sm">
                  <p className="footer_div_p footer_text_size  p-2 rounded">
                    <bold className="footer_div_title_text">Status: </bold>
                    <b className={statusTextClass}> {workingStatus}</b>
                  </p>
                </div>
              </div>
            </div>

            <div className="right_button_align">
              <a href="#" className="btn-sm btn-danger">
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
