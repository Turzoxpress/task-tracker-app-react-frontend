import React from "react";
import CloseButton from "react-bootstrap/CloseButton";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const User = ({ user, handleToggle, handleDelete, isLoggedIn, role }) => {
  // console.log("isLoggedIn value ToDo : " + isLoggedIn);

  const my_id = user._id;
  const handleClick = (e) => {
    e.preventDefault();

    let select = document.getElementById(my_id);
    let option = select.options[select.selectedIndex].text;

    let tempVar = option.toLowerCase();
    if (tempVar === "todo") {
      tempVar = "created";
    } else if (tempVar === "in progress") {
      tempVar = "working";
    }

    handleToggle(my_id + "_" + tempVar);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    handleDelete(e.currentTarget.id);
  };

  const options = ["admin", "employee", "user"];
  let defaultOption = options[0];

  for (let i = 0; i < options.length; i++) {
    if (user.role === options[i]) {
      defaultOption = options[i];
      break;
    }
  }

  let created_at = "NA";
  if (user.created_at) {
    let today = new Date(user.created_at);
    created_at = today.toLocaleString("en-US");
  }

  let last_login = "NA";
  if (user.last_login) {
    let today = new Date(user.last_login);
    last_login = today.toLocaleString("en-US");
  }

  return (
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="card m-3 shadow bg-white">
          <div className="card-body">
            {isLoggedIn ? (
              <div>
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
                      <option value={options[0]}>Admin</option>
                      <option value={options[1]}>Employee</option>
                      <option value={options[2]}>User</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <h5 className="card-title card_title p-2">
              <b>{user.name}</b>
            </h5>

            <div class="footer_div_custom">
              <div class="row">
                <div class="col-sm">
                  <p className="footer_div_p footer_text_size  p-2 rounded">
                    <bold className="footer_div_title_text">ID: </bold>
                    {user._id}
                  </p>
                </div>

                <div class="col-sm">
                  <p className="footer_div_p footer_text_size  p-2 rounded">
                    <bold className="footer_div_title_text">Email: </bold>
                    {user.email}
                  </p>
                </div>

                <div class="col-sm">
                  <p className="footer_div_p footer_text_size  p-2 rounded">
                    <bold className="footer_div_title_text">Joined: </bold>
                    {created_at}
                  </p>
                </div>

                <div class="col-sm">
                  <p className="footer_div_p footer_text_size  p-2 rounded">
                    <bold className="footer_div_title_text">
                      Last Logged In:{" "}
                    </bold>
                    {last_login}
                  </p>
                </div>

                <div class="col-sm">
                  <p className="footer_div_p footer_text_size  p-2 rounded">
                    <bold className="footer_div_title_text">Role: </bold>
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
