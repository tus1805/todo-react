import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ToDoList from "./pages/ToDoList"
import { adminAccount } from "./constants/error-message-signIn";
import { useEffect, useState } from "react";
import { setItemWithLocal } from "./utils/process-data";
import ProjectAdmin from "./pages/Project-admin";
import UserAdmin from "./pages/User-admin";

function App() {
  const [page, setPage] = useState(0);

  function setAdminAccount() {
    if (JSON.parse(localStorage.getItem("userdata"))) {
      return;
    }
    setItemWithLocal("userdata", [adminAccount]);
    return;
  }
  useEffect(() => {
    setAdminAccount();
  }, []);

  useEffect(() => {
    switchPage();
  }, [page]);

  function changeLink(pageNum) {
    setPage(pageNum);
  }

  console.log("chuyển page", page);

  function switchPage() {
    switch (page) {
      case 0:
        return <SignIn changeLink={changeLink} />;
      case 1:
        return <SignUp changeLink={changeLink} />;
      case 2:
        return <UserAdmin changeLink={changeLink} />;
      case 3:
        return <ToDoList changeLink={changeLink} />;
      default:
        return <ToDoList changeLink={changeLink} />;
    }
  }

  return (
    <div className="App">
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* {switchPage()} */}
      {/* <ToDoList/> */}
      {/* <ProjectAdmin/> */}
      <UserAdmin/>
    </div>
  );
}

export default App;
