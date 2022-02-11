import { Outlet, Link, useNavigate } from "react-router-dom";
import { doLogOut } from "../../utils/helper-log-status";
import Button from "../Button";

const Layout = () => {
  const navigate = useNavigate();
  function handleLogOut() {
    navigate("/sign-in");
    doLogOut();
  }
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
