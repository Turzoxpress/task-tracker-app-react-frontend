import React, { useState, Button, Fragment, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import constants from "../utils/constants";
import axios from "axios";

import { confirmAlert } from "react-confirm-alert"; // Import
import Navbar from "./NavBar";

import MoonLoader from "react-spinners/MoonLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
  marginTop: 50,
};

export default function (props) {
  const [selectedFile, setSelectedFile] = useState();
  const [tempFileName, settempFileName] = useState("Select attachment");

  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    settempFileName(event.target.files[0].name);
    // setIsSelected(true);
  };

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#07b428");

  const navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  React.useEffect(() => {
    setSelectedFile(null);
    settempFileName("Select attachment");
  }, []);

  const addNewTask = () => {
    let titleTxt = document.getElementById("title").value;
    let descriptionTxt = document.getElementById("description").value;

    if (titleTxt.length < 1 || descriptionTxt.length < 1) {
      //------- Delete confirmation
      const options = {
        title: "Invalid Input",
        message: "Please provide Title and Description first!",
        buttons: [
          {
            label: "Ok",
            // onClick: () => alert("Click No"),
          },
        ],
        closeOnEscape: false,
        closeOnClickOutside: false,
      };

      confirmAlert(options);

      //-----------------------------------------
    } else {
      //alert(titleTxt + "\n\n" + descriptionTxt);
      //-----------
      let name = localStorage.getItem("name");
      const token = localStorage.getItem("token");

      // const fileCount = document.getElementById("customFile").files.length;
      // alert(fileCount);

      let formData = new FormData();
      formData.append("task_name", titleTxt);
      formData.append("task_description", descriptionTxt);
      formData.append("created_by", name);
      //formData.append("file", document.getElementById("customFile").files[0]);
      formData.append("file", selectedFile);

      //console.log(document.getElementById("customFile").files[0]);
      // return;

      setLoading(true);

      axios({
        method: "post",
        url: constants.backend_server + constants.addTask,

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
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
              //  window.location.reload(false);
              //document.getElementById(id).style.visibility = "hidden";
            } else {
              alert(response.data.message);
            }
          }

          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          return error;
        });
      //-----------------------
    }
  };

  //--------------------

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
          <br></br>

          <div className="element-container">
            <div className="element">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <h5 className="card-header container_center_item">
                    <b> Add New Task</b>
                  </h5>
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <label for="inputText3" className="col-form-label">
                          Title*
                        </label>
                        <input
                          id="title"
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="form-group">
                        <label for="exampleFormControlTextarea1">
                          Description*
                        </label>
                        <textarea
                          className="form-control"
                          id="description"
                          rows="5"
                        ></textarea>
                      </div>

                      <div class="custom-file mb-3">
                        <input
                          type="file"
                          class="custom-file-input"
                          id="customFile"
                          onChange={changeHandler}
                        />
                        <label class="custom-file-label" for="customFile">
                          {tempFileName}
                        </label>
                      </div>

                      <div className="d-grid gap-2 mt-3">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={addNewTask}
                        >
                          Sumbit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
