import React from "react";
import { checkIsDone, editTask, deleteTask } from "../../../utils/todo-list";
import Button from "../../Button";
import Input from "../../Input";

const TodoItem = (props) => {
  const { taskId, taskName } = props;
  return (
    <div className="todo-item">
      <span className="todo-item-taskname">
        <Input
          inputType="checkbox"
          inputId="checkbox"
          onClick={checkIsDone(taskId)}
        />
        <label>{taskName}</label>
      </span>
      <span className="todo-item-option">
        <Button
          buttonClass="button-edit-task"
          buttonName="Edit"
          onClick={editTask(taskId)}
        />
        <Button
          buttonClass="button-delete-task"
          buttonName="Delete"
          onClick={deleteTask(taskId)}
        />
      </span>
    </div>
  );
};

export default TodoItem;
