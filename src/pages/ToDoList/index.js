import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Option from "../../components/Option";
import List from "../../components/List";
import { getDataFromLocalByKey } from "../../utils/process-data";
import { createTask, editTask, getAllTask } from "../../API/task";
import TodoItem from "../../components/List/TodoItem";

const ToDoList = () => {
  const [taskList, setTaskList] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [currentTask, setCurrentTask] = useState();
  const [option, setOption] = useState("all");

  function handleInputTask(event) {
    setTaskName(event.target.value);
  }

  useEffect(() => {
    renderTask();
  }, []);

  useEffect(() => {
    renderTask();
  }, [option]);

  async function renderTask() {
    const taskData = await getAllTask();
    const notDeleteTask = taskData.filter((task) => task.isDeleted === false);
    let filteredTask = notDeleteTask;
    if (option === "done") {
      filteredTask = notDeleteTask.filter((value) => value.isDone === true);
    } else if (option === "undone") {
      filteredTask = notDeleteTask.filter((value) => value.isDone === false);
    }
    setTaskList(filteredTask);
  }

  async function addTask() {
    if (taskName === "") {
      return;
    }
    const currentUsername = getDataFromLocalByKey("currentUser").username;
    const newTask = {
      taskName: taskName,
      isDone: false,
      createdBy: currentUsername,
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
  function handleFilterOption(event) {
    setOption(event.target.value);
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
                renderTask={renderTask}
                isDone={value.isDone}
              />
            );
          })}
        </List>
      </Container>
    </Container>
  );
};

export default ToDoList;
