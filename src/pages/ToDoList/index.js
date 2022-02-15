import React, { useState } from "react";
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

const ToDoList = () => {
  const [taskName, setTaskName] = useState("");
  console.log(taskName);

  function handleInputTask(event) {
    setTaskName(event.target.value);
  }

  function addTask() {
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
    const taskList = getDataFromLocalByKey("taskList");
    taskList.push(newTask);
    setItemWithLocal("taskList", taskList);
    resetForm();
    renderTaskList();
  }

  function updateTask() {
    const idRef = getDataFromLocalByKey("ref");
    const updatedTaskName = handleInputTask();
    const taskList = getDataFromLocalByKey("taskList");
    taskList.forEach((value, index) => {
      if (value.taskId === idRef) {
        value.taskName = updatedTaskName;
      }
    });
    setItemWithLocal("taskList", taskList);
    renderTaskList();
    resetForm();
  }

  function resetForm() {
    const inputText = document.getElementById("add-task-field");
    document.querySelector(".button-update-task").style.display = "none";
    document.querySelector(".button-add-task").style.display = "inline";
    inputText.value = "";
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
        <List listClass="todo-list" listId="todo-list" />
      </Container>
    </Container>
  );
};

export default ToDoList;
