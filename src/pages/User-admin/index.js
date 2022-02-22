import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { doLogOut } from "../../utils/helper-log-status";
import { getDataFromLocalByKey } from "../../utils/process-data";
import { enableForm, disableForm } from "../../utils/user-admin";
import { deleteUser, getAllUser, getUserById } from "../../API/user";
import SignUpAdmin from "./component/SignUp.js";
import ButtonContainer from "./component/ButtonContainer";

const UserAdmin = (props) => {
  const { changeLink } = props;

  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [isDisable, setIsDisable] = useState(true);
console.log(userList);
  useEffect(() => {
    isDisable ? disableForm() : enableForm();
  }, [isDisable]);
  
  useEffect(() =>{
    renderUser();
  }, [])

  function handleLogOut() {
    doLogOut();
    changeLink(0);
  }

  async function renderUser() {
    const userData = await getAllUser();
    const notDeleteUser = userData.filter((user) => user.isDeleted === false);
    let filteredUser = notDeleteUser;
    setUserList(filteredUser);
  }

  function addUser() {
    setIsDisable(false);
  }

  async function handleEditUser(userId) {
    console.log("edit");
    setIsDisable(false);
    const requestId = {
      _id: userId
    }
    const currentUser = await getUserById(requestId)
    setCurrentUser(currentUser);
    // const userList = await getAllUser();
    // userList.forEach((value, index) => {
    //   if (value.userId === userId) {
    //     document.getElementById("name").value = value.name;
    //     document.getElementById("username").value = value.username;
    //     document.getElementById("password").value = value.password;
    //     document.getElementById("confirmPassword").value =
    //       value.confirmPassword;
    //     document.getElementById("age").value = value.age;
    //     if (value.gender === "male") {
    //       document.getElementById("male").checked = true;
    //     } else if (value.gender === "female") {
    //       document.getElementById("female").checked = true;
    //     }
    //     if (value.role === "admin") {
    //       document.getElementById("setAdmin").checked = true;
    //     } else {
    //       document.getElementById("setAdmin").checked = false;
    //     }
    //     localStorage.setItem("ref", value.userId);
    //   }
    // });
    document.querySelector(".button-update-user").style.display = "inline";
    document.querySelector(".button-add-user").style.display = "none";
    return userList;
  }

  async function handleDeleteUser(id){
    await deleteUser(id);
    console.log(1);
    renderUser()
  }

  // const ButtonContainer = (props) => {
  //   const { userId } = props;
  //   console.log(userId);
  //   return (
  //     <>
  //       <Button
  //         buttonClass="button-edit-task"
  //         buttonName="Edit"
  //         onClick={() => handleEditUser(userId)}
  //       />
  //       <Button
  //         buttonClass="button-delete-task"
  //         buttonName="Delete"
  //         onClick={() => handleDeleteUser(userId)}
  //       />
  //     </>
  //   );
  // };

  return (
    <Container containerName="l-container">
      <div className="user-admin-control">
        <div className="user-info-table">
          <Table tableId="user-table">
            <tbody>
              <tr>
                <td>Name</td>
                <td>Role</td>
              </tr>
              {userList.map((user) => (
                <>
                  <tr className="user-table" key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                  </tr>
                  <tr className="user-table-option">
                    <ButtonContainer userId={user._id} setIsDisable={setIsDisable} setCurrentUser={setCurrentUser} userList={userList} setUserList={setUserList} />
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
          <div className="control-option">
            <Button
              buttonName="Add user"
              buttonClass="button-add-task"
              onClick={addUser}
            />
          </div>
        </div>
        <SignUpAdmin />
      </div>
    </Container>
  );
};

export default UserAdmin;
