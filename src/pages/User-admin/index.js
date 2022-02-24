import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { enableForm, disableForm } from "../../utils/user-admin";
import { deleteUser, getAllUser } from "../../API/user";
import SignUpAdmin from "./component/SignUp.js";
import ButtonContainer from "./component/ButtonContainer";
import { resetForm } from "../../utils/helper-validate";

const UserAdmin = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [isEditting, setIsEditting] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    role: "",
  });
  // console.log(userList);
  useEffect(() => {
    isDisable ? disableForm() : enableForm();
  }, [isDisable]);

  useEffect(() => {
    renderUser();
  }, []);

  async function renderUser() {
    const userData = await getAllUser();
    const notDeleteUser = userData.filter((user) => user.isDeleted === false);
    let filteredUser = notDeleteUser;
    setUserList(filteredUser);
  }

  function addUser() {
    document.querySelector(".button-update-user").style.display = "none";
    document.querySelector(".button-add-user").style.display = "inline";
    enableForm();
    resetForm();
  }

  async function handleDeleteUser(id) {
    await deleteUser(id);
    console.log(1);
    renderUser();
  }

  return (
    <Container containerName="l-container">
      <div className="user-admin-control">
        <div className="user-info-table">
          <Table tableId="user-table">
            <tbody>
              <tr>
                <td>Name</td>
                <td>Admin</td>
              </tr>
              {userList.map((user) => (
                <>
                  <tr className="user-table" key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.isAdmin.toString()}</td>
                  </tr>
                  <tr className="user-table-option">
                    <ButtonContainer
                      userId={user._id}
                      setIsDisable={setIsDisable}
                      setCurrentUser={setCurrentUser}
                      userList={userList}
                      setUserList={setUserList}
                      data={data}
                      setData={setData}
                      isEditting={isEditting}
                      setIsEditting={setIsEditting}
                      enableForm={enableForm}
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
        <SignUpAdmin
          userList={userList}
          setUserList={setUserList}
          setCurrentUser={setCurrentUser}
          data={data}
          setData={setData}
          isEditting={isEditting}
          setIsEditting={setIsEditting}
          disableForm={disableForm}
        />
      </div>
    </Container>
  );
};

export default UserAdmin;
