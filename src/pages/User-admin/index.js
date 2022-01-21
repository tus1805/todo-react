import React from 'react';
import Container from '../../components/Container';
import Table from '../../components/Table';
import SignUp from '../SignUp';
import Header from '../../components/Header';
import HeaderLeft from '../../components/Header-Left';
import HeaderRight from '../../components/Header-Right';
import Link from '../../components/Link';
import Button from '../../components/Button';

const UserAdmin = (props) => {
  const {changeLink, onClick} =props
  return (
    <Container
      containerName="l-container"
    >
      <>
        <Header
          headerName="header"
        >
          <>
            <HeaderLeft>
              <>
                <Link linkName="Main" onClick={changeLink} />
                <Link linkName="Project" onClick={changeLink} />
                <Link linkName="User" onClick={changeLink} />
              </>
            </HeaderLeft>
            <HeaderRight>
              <Button
                onClick={onClick}
                buttonName="Log out"
              />
            </HeaderRight>
          </>
        </Header>
        <div className="user-admin-control">
          <Table
            tableClassName="user-info-table"
            tableId="user-table"
          >
            <tr>
              <th>Name</th>
              <th>is Admin</th>
            </tr>
            <div class="control-option">
              <button type="button" class="button-add-task" onclick="addUser()">Add user</button>
            </div>
          </Table>
          <SignUp></SignUp>
        </div>
      </>
    </Container>
  );
};

export default UserAdmin;
