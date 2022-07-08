import React from "react";
import CloseButton from "react-bootstrap/CloseButton";

const ToDo = ({ todo, handleToggle, handleDelete }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleToggle(e.currentTarget.id);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    handleDelete(e.currentTarget.id);
  };

  return (
    <div className="center_div custom_div_center">
      <p
        id={todo._id + "_" + todo.status}
        key={todo._id + todo.task_name}
        name="todo"
        value={todo.task_name}
        onClick={handleClick}
        className={todo.status === "completed" ? "todo strike" : "todo"}
      >
        {todo.task_name}
      </p>

      <button
        className={"close_button"}
        id={todo._id}
        onClick={handleDeleteClick}
      >
        X
      </button>
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
