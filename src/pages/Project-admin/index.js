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
// import { doLogOut } from '../../utils/helper-verycool';

const ProjectAdmin = (props) => {
  const { changeLink, onClick } = props
  // onClick = doLogOut()
  function handleInputProject() { };
  function addProject() { };
  function updateProject() { };
  function resetForm() { };
  function handleFilterOption() { };
  function addTask() { };
  function addUser() { };
  function getSelectedUser() { };

  return (
    <Container containerName="l-container">
      <>
        <Header headerName="header">
          <>
            <HeaderLeft>
              <>
                <Link linkName="Main" onClick={changeLink} />
                <Link linkName="Project" onClick={changeLink} />
                <Link linkName="User" onClick={changeLink} />
              </>
            </HeaderLeft>
            <HeaderRight>
              <Button onClick={onClick} buttonName="Log out" />
            </HeaderRight>
          </>
        </Header>
        <Container containerName="todo-container">
          <>
            <h1 id="welcome-message" className="welcome-message">
              Project Management
            </h1>
            <div className="todo-form">
              <>
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
              </>
            </div>
            <div className="filter-option">
              <Select
                name="filter"
                selectId="filter"
                selectClass="filter"
                onChange={handleFilterOption}
              >
                <>
                  <Option value="all" name="All" />
                  <Option value="done" name="Done" />
                  <Option value="undone" name="Undone" />
                </>
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
                  <Button buttonClass="button-add-task" onClick={addTask}>
                    Add
                  </Button>
                </div>
                <List listId="task-list"></List>
              </List>
              <List className="todo-list">
                <h3 id="user-project-name">User list in Project</h3>
                <div className="todo-form">
                  <Select selectId="users" onChange={getSelectedUser}></Select>
                  <Button buttonClass="button-add-user" onClick={addUser}>
                    Add
                  </Button>
                </div>
                <List listId="user-list"></List>
              </List>
            </Container>
          </>
        </Container>
      </>
    </Container>
  );
};

export default ProjectAdmin;
