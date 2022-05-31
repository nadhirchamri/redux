import "./Todo.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask, checkTask } from "../JS/actions/task";
import { Link } from "react-router-dom";
import Task from "./Task";

const ToDo = ({ task }) => {
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [filter, setfilter] = useState("all");
  // get tasks from store
  const tasks = useSelector((state) => state.taskReducer.tasks);

  const dispatch = useDispatch();

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteTask(id));
  };
  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleCheck = () => {
    dispatch(checkTask(task.id));
  };

  const handleAdd = () => {
    if (text) {
      dispatch(addTask({ id: Math.random(), text: text, done: false }));
      setText("");
    } else {
      alert("can not add empty task!!");
    }
  };
  return (
    <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
      {/* App title section */}
      <div className="row m-1 p-4">
        <div className="col">
          <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
            <i className="fa fa-check bg-primary text-white rounded p-2" />
            <u>My Todo-s</u>
          </div>
        </div>
      </div>
      {/* Create todo section */}
      <div className="row m-1 p-3">
        <div className="col col-11 mx-auto">
          <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
            <div className="col">
              <input
                className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </div>
            <div className="col-auto m-0 px-2 d-flex align-items-center">
              <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">
                Due date not set
              </label>
            </div>
            <div className="col-auto px-0 mx-0 mr-2">
              <button
                onClick={handleAdd}
                type="button"
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 mx-4 border-black-25 border-bottom" />
      {/* View options section */}
      <div className="row m-1 p-3 px-5 justify-content-end">
        <div className="col-auto d-flex align-items-center">
          <label className="text-secondary my-2 pr-2 view-opt-label">
            Filter
          </label>
          <select className="custom-select custom-select-sm btn my-2">
            <option onClick={() => setfilter("all")} value="all" selected>
              All
            </option>
            <option onClick={() => setfilter("done")} value="completed">
              Completed
            </option>
            <option onClick={() => setfilter("undone")} value="active">
              Active
            </option>
          </select>
        </div>
      </div>
      {/* Todo list section */}
      <div className="row mx-1 px-5 pb-3 w-80">
        <div className="col mx-auto">
          {tasks.map((task) => (
            <div
              className="row px-3 align-items-center todo-item editing rounded"
              // key={task.id}
            >
              <div className="col-auto m-1 p-0 d-flex align-items-center">
                <h2 className="m-0 p-0">
                  <i
                    className="fa fa-square-o text-primary btn m-0 p-0"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Mark as complete"
                  />
                  <i
                    className="fa fa-check-square-o text-primary btn m-0 p-0 d-none"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Mark as todo"
                  />
                </h2>
              </div>
              <div className="col px-1 m-1 d-flex align-items-center">
                <Link to={`/edit/${task.id}`}>
                  {" "}
                  <i onClick={handleEdit} class="fa-solid fa-pen-to-square"></i>
                </Link>

                <input
                  type="text"
                  className="form-control form-control-lg border-0 edit-todo-input rounded px-3"
                  value={task.text}
                />
              </div>
              <div className="col-auto m-1 p-0 px-3 d-none"></div>
              <div className="col-auto m-1 p-0 todo-actions">
                <div className="row d-flex align-items-center justify-content-end">
                  <h5 className="m-0 p-0 px-2 edit-icon">
                    <Link to={`/edit/${task.id}`}>
                      {" "}
                      <i
                        onClick={handleEdit}
                        className="fa fa-pencil text-info btn m-0 p-0"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Edit todo"
                      />
                    </Link>
                  </h5>

                  <h5 className="m-0 p-0 px-2">
                    <i
                      onClick={(e) => handleDelete(e, task.id)}
                      class="fa-solid fa-trash-can"
                    ></i>

                    <i
                      onClick={(e) => handleCheck(e, task.id)}
                      class="fa-solid fa-check"
                    ></i>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDo;