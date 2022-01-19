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

const ToDoList = (props) => {
  const { changeLink, onClick } = props
  function handleInputTask() {}
  function addTask() {}
  function updateTask() {}
  function resetForm() {}
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
              <Form
              children={
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
              }
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
