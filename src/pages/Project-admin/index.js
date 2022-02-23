import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Option from "../../components/Option";
import List from "../../components/List";
import { getAllProject, createProject, editProject } from "../../API/project";

const ProjectAdmin = () => {
  const [projectList, setProjectList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [currentProject, setCurrentProject] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [option, setOption] = useState("all");

  function handleInputProject(event) {
    setProjectName(event.target.value);
  }

  useEffect(() => {
    renderProject();
    setCurrentUser(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    renderProject();
  }, [option]);

  async function renderProject() {
    const projectData = await getAllProject();
    const notDeleteProject = projectData.filter(
      (project) => project.isDeleted === false
    );
    let filteredProject = notDeleteProject;
    if (option === "done") {
      filteredProject = notDeleteProject.filter(
        (value) => value.isDone === true
      );
    } else if (option === "undone") {
      filteredProject = notDeleteProject.filter(
        (value) => value.isDone === false
      );
    }
    setProjectList(filteredProject);
  }

  async function addProject() {
    if (projectName === "") {
      return;
    }
    const newProject = {
      projectName: projectName,
      isDone: false,
      createdBy: currentUser,
    };
    await createProject(newProject);
    resetForm();
    renderProject();
  }

  async function updateProject() {
    currentProject.projectName = projectName;
    await editProject(currentProject);
    renderProject();
    resetForm();
  }

  function resetForm() {
    document.querySelector(".button-update-task").style.display = "none";
    document.querySelector(".button-add-task").style.display = "inline";
    setProjectName("");
  }
  function handleFilterOption(event) {
    setOption(event.target.value);
  }
  function getSelectedUser() {}

  return (
    <Container containerName="l-container">
      <Container containerName="todo-container">
        <h1 id="welcome-message" className="welcome-message">
          Project Management
        </h1>
        <div className="todo-form">
          <Input
            inputId="add-task-field"
            inputType="text"
            onChange={handleInputProject}
          />
          <Button
            buttonClass="button-add-task"
            buttonName="Add"
            onClick={addProject}
          />
          <Button
            buttonClass="button-update-task"
            buttonName="Update"
            onClick={updateProject}
          />
          <Button
            buttonClass="button-clear-task"
            buttonName="Clear"
            onClick={resetForm}
          />
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
        <Container containerName="project-control-container">
          <List className="todo-list">
            <h3>Project list</h3>
            <List className="project-list" />
          </List>
          <List className="todo-list">
            <h3 id="task-project-name">Task list in Project</h3>
            <div className="todo-form">
              <Select selectId="tasks"></Select>
              <Button buttonClass="button-add-task" onClick={addProject}>
                Add
              </Button>
            </div>
            <List listId="task-list"></List>
          </List>
          <List className="todo-list">
            <h3 id="user-project-name">User list in Project</h3>
            <div className="todo-form">
              <Select selectId="users" onChange={getSelectedUser}></Select>
              <Button buttonClass="button-add-user" onClick={addProject}>
                Add
              </Button>
            </div>
            <List listId="user-list"></List>
          </List>
        </Container>
      </Container>
    </Container>
  );
};

export default ProjectAdmin;
