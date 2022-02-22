import { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { doLogOut } from "../../utils/helper-log-status";
import {
  getDataFromLocalByKey,
  getDataFromSessionByKey,
} from "../../utils/process-data";
import Button from "../Button";

const Layout = () => {
  const navigate = useNavigate();
  function handleLogOut() {
    navigate("/sign-in");
    doLogOut();
  }
  function checkLoginStatus() {
    const token =
      getDataFromLocalByKey("todoToken").token ||
      getDataFromSessionByKey("todoToken").token;
    if (token?.length > 0 || token === undefined) {
      alert("You are not logged in");
      navigate("/sign-in");
    }
  }

  useEffect(() => {
    checkLoginStatus();
  });

  return (
    <div>
      <div className="header">
        <nav>
          <Link to="/">Main</Link>
          <Link to="project-admin">Project</Link>
          <Link to="user-admin">User</Link>
        </nav>
        <Button
          onClick={handleLogOut}
          buttonName="Log out"
          buttonClass="logout-button"
        />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
