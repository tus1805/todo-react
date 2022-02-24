import React, { useState, useEffect }  from 'react'
import Button from '../../../components/Button';
import { deleteUser, getAllUser, getUserById } from "../../../API/user";


const ButtonContainer = (props) => {
  const { userId, setIsDisable, setCurrentUser, userList, setUserList, data, setData, isEditting, setIsEditting, enableForm } = props;
  
  

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
    enableForm();
    // setIsEditting(true)
    const requestId = {
      _id: userId
    }
    const currentUser = await getUserById(requestId)
    console.log(currentUser);
    setCurrentUser(currentUser);
    setData(
      { 
        _id: currentUser._id,
        name: currentUser.name,
        username: currentUser.username,
        password: currentUser.password,
        age: currentUser.age,
        gender: currentUser.gender,
        isAdmin: currentUser.isAdmin,
      }
    )
    // const userList = await getAllUser();
    // userList.forEach((value, index) => {
      // if (currentUser._id === userId) {

        if (currentUser.gender === "male") {
          document.getElementById("male").checked = true;
        } else if (currentUser.gender === "female") {
          document.getElementById("female").checked = true;
        }
        if (currentUser.isAdmin === true) {
          document.getElementById("role").checked = true;
        } else {
          document.getElementById("role").checked = false;
        }
        // localStorage.setItem("ref", currentUser.userId);
      // }
    // })
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