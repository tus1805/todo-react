import React from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import HeaderLeft from '../../components/Header-Left';
import HeaderRight from '../../components/Header-Right';
import Link from "../../components/Link";
import Button from '../../components/Button';
import ToDoContainer from '../../components/ToDoContainer';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Option from '../../components/Option';
import List from '../../components/List';
import { renderTaskList, getItemFromLocal, getTaskFromLocal,setItemToLocal } from '../../utils/todo-list';

const ToDoList = (props) => {
  const { changeLink, onClick } = props
  function handleInputTask() {
    return document.getElementById("add-task-field").value;
  }

  function addTask() {
    const newId = Math.floor(Math.random() * 10000000) + 1;
    const newTaskName = handleInputTask();
    const currentUsername = getItemFromLocal("currentUser").username;
    const newTask = { "taskId": newId, "taskName": newTaskName, "username": currentUsername, "isDone": false }
    newTask.isCreatedByAdmin = getItemFromLocal("currentUser").role === "admin"
    const taskList = getTaskFromLocal();
    taskList.push(newTask);
    setItemToLocal("taskList", taskList);
    resetForm();
    renderTaskList();
  }

  function updateTask() {
    const idRef = getItemFromLocal("ref");
    const updatedTaskName = handleInputTask();
    const taskList = getTaskFromLocal();
    taskList.forEach((value, index) => {
      if (value.taskId === idRef) {
        value.taskName = updatedTaskName;
      }
    });
    setItemToLocal("taskList", taskList);
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
    <Container>
      <>
        <Header
          headerName="header"
          children={
            <>
              <HeaderLeft>
                <>
                  <Link linkName="Main" onClick={changeLink} />
                  <Link linkName="Project" onClick={changeLink} />
                  <Link linkName="User" onClick={changeLink} />
                </>
              </HeaderLeft>
              <HeaderRight>
                <Button
                  onClick={onClick}
                  buttonName="Log out"
                />
              </HeaderRight>
            </>
          }
        />
        <ToDoContainer>
          <>
            <h1 id="welcome-message" class="welcome-message">Hello</h1>
            <div className='todo-form'>
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
            <Select
              name="filter"
              selectId="filter"
              selectClass="filter"
              onChange={handleFilterOption()}
              children={
                <>
                  <Option value="all" name="All" />
                  <Option value="done" name="Done" />
                  <Option value="undone" name="Undone" />
                </>
              }
            />
            <List
              listClass="todo-list"
              listId="todo-list"
            />
          </>
        </ToDoContainer>
      </>
    </Container>
  )
};

export default ToDoList;
