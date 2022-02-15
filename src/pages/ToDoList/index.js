import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Option from "../../components/Option";
import List from "../../components/List";
import { renderTaskList } from "../../utils/todo-list";
import {
  getDataFromLocalByKey,
  setItemWithLocal,
} from "../../utils/process-data";
import { createTask, editTask, getAllTask, getTaskById } from "../../API/task";
import TodoItem from "../../components/List/TodoItem";

const ToDoList = () => {
  const [taskList, setTaskList] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [currentTask, setCurrentTask] = useState();

  function handleInputTask(event) {
    setTaskName(event.target.value);
  }

  useEffect(() => {
    renderTask();
  }, []);

  async function renderTask() {
    const taskData = await getAllTask();
    setTaskList(taskData);
  }

  async function addTask() {
    if (taskName === "") {
      return;
    }
    const newId = Math.floor(Math.random() * 10000000) + 1;
    const currentUsername = getDataFromLocalByKey("currentUser").username;
    const newTask = {
      taskId: newId,
      taskName: taskName,
      username: currentUsername,
      isDone: false,
    };
    newTask.isCreatedByAdmin =
      getDataFromLocalByKey("currentUser").role === "admin";
    await createTask(newTask);
    resetForm();
    renderTask();
  }

  async function updateTask() {
    currentTask.taskName = taskName;
    await editTask(currentTask);
    renderTask();
    resetForm();
  }

  function resetForm() {
    document.querySelector(".button-update-task").style.display = "none";
    document.querySelector(".button-add-task").style.display = "inline";
    setTaskName("");
  }
  function handleFilterOption() {
    const chosenOption = document.getElementById("filter").value;
    renderTaskList(chosenOption);
    return chosenOption;
  }

  return (
    <Container containerName="l-container">
      <Container containerName="todo-container">
        <h1 id="welcome-message" className="welcome-message">
          Hello
        </h1>
        <div className="todo-form">
          <>
            <Input
              inputId="add-task-field"
              inputType="text"
              value={taskName}
              onChange={handleInputTask}
            />
            <Button
              buttonClass="button-add-task"
              buttonName="Add"
              onClick={addTask}
            />
            <Button
              buttonClass="button-update-task"
              buttonName="Update"
              onClick={updateTask}
            />
            <Button
              buttonClass="button-clear-task"
              buttonName="Clear"
              onClick={resetForm}
            />
          </>
        </div>
        <div className="filter-option">
          <Select
            name="filter"
            selectId="filter"
            selectClass="filter"
            onChange={handleFilterOption}
          >
            <Option value="all" name="All" />
            <Option value="done" name="Done" />
            <Option value="undone" name="Undone" />
          </Select>
        </div>
        <List listClass="todo-list" listId="todo-list">
          {taskList.map((value) => {
            return (
              <TodoItem
                key={value._id}
                taskId={value._id}
                taskName={value.taskName}
                setTaskName={setTaskName}
                setCurrentTask={setCurrentTask}
              />
            );
          })}
        </List>
      </Container>
    </Container>
  );
};

export default ToDoList;
