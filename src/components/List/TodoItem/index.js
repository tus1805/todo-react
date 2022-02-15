import React from "react";
import { getTaskById } from "../../../API/task";
import { checkIsDone, editTask, deleteTask } from "../../../utils/todo-list";
import Button from "../../Button";
import Input from "../../Input";

const TodoItem = (props) => {
  const { taskId, taskName, setTaskName, setCurrentTask } = props;
  async function handleEditTask(taskId) {
    document.querySelector(".button-update-task").style.display = "inline";
    document.querySelector(".button-add-task").style.display = "none";
    setTaskName(taskName);
    const requestId = {
      _id: taskId,
    };
    const currentTask = await getTaskById(requestId);
    setCurrentTask(currentTask);
  }
  return (
    <div className="todo-item">
      <span className="todo-item-taskname">
        <Input
          inputType="checkbox"
          inputId="checkbox"
          onClick={() => checkIsDone(taskId)}
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
          onClick={() => deleteTask(taskId)}
        />
      </span>
    </div>
  );
};

export default TodoItem;
