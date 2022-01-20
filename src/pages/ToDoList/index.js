import React from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import HeaderLeft from '../../components/Header-Left';
import HeaderRight from '../../components/Header-Right';
import Link from "../../components/Link";
import Button from '../../components/Button';
import ToDoContainer from '../../components/ToDoContainer';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Option from '../../components/Option';
import List from '../../components/List';


const ToDoList = (props) => {
  const { changeLink, onClick } = props
  function handleInputTask() {}
  function addTask() {}
  function updateTask() {}
  function resetForm() {}
  function handleFilterOption() {}
  return (
    <Container
      children={
        <>
          <Header
            headerName="header"
            children={
              <>
                <HeaderLeft
                  children={
                    <>
                      <Link linkName="Main" onClick={changeLink} />
                      <Link linkName="Project" onClick={changeLink} />
                      <Link linkName="User" onClick={changeLink} />
                    </>
                  }
                />
                <HeaderRight
                children={
                  <Button
                    onClick={onClick}
                    buttonName="Log out"
                  />
                }
                />
              </>
            }
          />
          <ToDoContainer
            children={
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
            }
          />
        </>
      }
    />
  )
};

export default ToDoList;
