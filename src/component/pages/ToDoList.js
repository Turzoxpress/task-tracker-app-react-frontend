import React from "react";
import ToDo from "./ToDo";

const ToDoList = ({ toDoList, handleToggle, handleDelete, isLoggedIn }) => {
  // console.log("isLoggedIn value ToDoList : " + isLoggedIn);
  return (
    <div className="custom_div_center">
      {toDoList.map((todo) => {
        return (
          <ToDo
            todo={todo}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            isLoggedIn={isLoggedIn}
          />
        );
      })}
      {/* <button style={{ margin: "20px" }} onClick={handleFilter}>
        Clear Completed
      </button> */}
    </div>
  );
};

export default ToDoList;
