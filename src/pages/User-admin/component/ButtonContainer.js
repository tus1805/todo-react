import React, { useState, useEffect }  from 'react'
import Button from '../../../components/Button';
import { deleteUser, getAllUser, getUserById } from "../../../API/user";

const ButtonContainer = (props) => {
  const { userId, setIsDisable, setCurrentUser, userList, setUserList, data } = props;
  
  

  async function renderUser() {
    const userData = await getAllUser();
    const notDeleteUser = userData.filter((user) => user.isDeleted === false);
    let filteredUser = notDeleteUser;
    setUserList(filteredUser);
  }

  async function handleEditUser(userId) {
    console.log("edit");
    let data = {};
    console.log(data);
    setIsDisable(false);
    const requestId = {
      _id: userId
    }
    const currentUser = await getUserById(requestId)
    // console.log(currentUser);
    setCurrentUser(currentUser);
    // const userList = await getAllUser();
    // userList.forEach((value, index) => {
      // if (currentUser._id === userId) {
        document.getElementById("name").value = currentUser.name;
        document.getElementById("username").value = currentUser.username;
        document.getElementById("password").value = currentUser.password;
        document.getElementById("confirmPassword").value =
        currentUser.password;
        document.getElementById("age").value = currentUser.age;
        if (currentUser.gender === "male") {
          document.getElementById("male").checked = true;
        } else if (currentUser.gender === "female") {
          document.getElementById("female").checked = true;
        }
        if (currentUser.role === "admin") {
          document.getElementById("setAdmin").checked = true;
        } else {
          document.getElementById("setAdmin").checked = false;
        }
        // localStorage.setItem("ref", currentUser.userId);
      // }
    // });
    data.name = currentUser.name;
    data.username = currentUser.username;
    data.password = currentUser.password;
    data.age = currentUser.age;
    data.gender = currentUser.gender;
    data.role = currentUser.role;
    console.log(data);
    
    document.querySelector(".button-update-user").style.display = "inline";
    document.querySelector(".button-add-user").style.display = "none";
    return userList;
  }

  async function handleDeleteUser(id){
    const userId = {_id: id}
    await deleteUser(userId);
    console.log(1);
    renderUser()
  }

  return (
    <>
      <Button
        buttonClass="button-edit-task"
        buttonName="Edit"
        onClick={() => handleEditUser(userId)}
      />
      <Button
        buttonClass="button-delete-task"
        buttonName="Delete"
        onClick={() => handleDeleteUser(userId)}
      />
    </>
  );
};

export default ButtonContainer