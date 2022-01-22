import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Table from "../../components/Table";
import SignUp from "../SignUp";
import Header from "../../components/Header";
import HeaderLeft from "../../components/Header-Left";
import HeaderRight from "../../components/Header-Right";
import Link from "../../components/Link";
import Button from "../../components/Button";
import { doLogOut } from "../../utils/helper-log-status";
import { getDataFromLocalByKey } from "../../utils/process-data";
import { enableForm, disableForm } from "../../utils/user-admin";

const UserAdmin = (props) => {
  const { changeLink } = props;
  const userList = getDataFromLocalByKey("userdata").filter(
    (value) => value.isDeleted !== true
  );
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    isDisable ? disableForm() : enableForm();
  }, [isDisable]);

  function handleLogOut() {
    doLogOut();
    changeLink(0);
  }

  function addUser() {}

  function editUser(userId) {
    console.log("edit");
    setIsDisable(false);
    const userList = getDataFromLocalByKey("userdata");
    userList.forEach((value, index) => {
      if (value.userId === userId) {
        document.getElementById("name").value = value.name;
        document.getElementById("username").value = value.username;
        document.getElementById("password").value = value.password;
        document.getElementById("confirmPassword").value =
          value.confirmPassword;
        document.getElementById("age").value = value.age;
        if (value.gender === "male") {
          document.getElementById("male").checked = true;
        } else if (value.gender === "female") {
          document.getElementById("female").checked = true;
        }
        if (value.role === "admin") {
          document.getElementById("setAdmin").checked = true;
        } else {
          document.getElementById("setAdmin").checked = false;
        }
        localStorage.setItem("ref", value.userId);
      }
    });
    document.querySelector(".button-update-user").style.display = "inline";
    document.querySelector(".button-add-user").style.display = "none";
    return userList;
  }

  return (
    <Container containerName="l-container">
      <Header>
        <HeaderLeft>
          <Link linkName="Main" onClick={changeLink} />
          <Link linkName="Project" onClick={changeLink} />
          <Link linkName="User" onClick={changeLink} />
        </HeaderLeft>
        <HeaderRight>
          <Button
            onClick={handleLogOut}
            buttonName="Log out"
            buttonClass="logout-button"
          />
        </HeaderRight>
      </Header>
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
                  <tr className="user-table" key={user.userId}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                  </tr>
                  <tr className="user-table-option">
                    <Button
                      buttonClass="button-edit-task"
                      buttonName="Edit"
                      onClick={() => editUser(user.userId)}
                    />
                    <Button
                      buttonClass="button-delete-task"
                      buttonName="Delete"
                      // onClick={() => editUser(user.userId)}
                    />
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
        <SignUp></SignUp>
      </div>
    </Container>
  );
};

export default UserAdmin;
