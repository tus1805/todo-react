import React from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import HeaderLeft from '../../components/Header-Left';
import HeaderRight from '../../components/Header-Right';
import Link from "../../components/Link";
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Option from '../../components/Option';
import List from '../../components/List';
import { renderTaskList} from '../../utils/todo-list';
import { doLogOut } from "../../utils/helper-log-status";
import {
  getDataFromLocalByKey,
  setItemWithLocal,
} from "../../utils/process-data";

const ToDoList = (props) => {
  const { changeLink } = props;
  function handleInputTask() {
    return document.getElementById("add-task-field").value;
  }

  function addTask() {
    const newId = Math.floor(Math.random() * 10000000) + 1;
    const newTaskName = handleInputTask();
    const currentUsername = getDataFromLocalByKey("currentUser").username;
    const newTask = {
      taskId: newId,
      taskName: newTaskName,
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

  function handleLogOut() {
    doLogOut();
    changeLink(0);
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
