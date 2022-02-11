import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ToDoList from "./pages/ToDoList"
import { adminAccount } from "./constants/error-message-signIn";
import { useEffect, useState } from "react";
import { setItemWithLocal } from "./utils/process-data";
import ProjectAdmin from "./pages/Project-admin";
import UserAdmin from "./pages/User-admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

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

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ToDoList />} />
            <Route path="project-admin" element={<ProjectAdmin />} />
            <Route path="user-admin" element={<UserAdmin />} />
          </Route>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
