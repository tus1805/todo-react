import React from "react";
import { getTaskById, deleteTask, editTask } from "../../../API/task";
import Button from "../../Button";
import Input from "../../Input";

const TodoItem = (props) => {
  const { taskId, taskName, setTaskName, setCurrentTask, renderTask, isDone } =
    props;

  async function handleEditTask(id) {
    document.querySelector(".button-update-task").style.display = "inline";
    document.querySelector(".button-add-task").style.display = "none";
    setTaskName(taskName);
    const requestId = {
      _id: id,
    };
    const currentTask = await getTaskById(requestId);
    setCurrentTask(currentTask);
  }

  async function handleDeleteTask(id) {
    await deleteTask(id);
    renderTask();
  }

  async function handleCheckIsDone(id) {
    const requestId = {
      _id: id,
    };
    const currentTask = await getTaskById(requestId);
    currentTask.isDone = !currentTask.isDone;
    await editTask(currentTask);
    renderTask();
  }

  return (
    <div className="todo-item">
      <span className="todo-item-taskname">
        <Input
          inputType="checkbox"
          inputId="checkbox"
          checked={isDone}
          onClick={() => handleCheckIsDone(taskId)}
        />
        <label>{taskName}</label>
      </span>
      <span className="todo-item-option">
        <Button
          buttonClass="button-edit-task"
          buttonName="Edit"
          onClick={() => handleEditTask(taskId)}
        />
        <Button
          buttonClass="button-delete-task"
          buttonName="Delete"
          onClick={() => handleDeleteTask(taskId)}
        />
      </span>
    </div>
  );
};

export default TodoItem;
