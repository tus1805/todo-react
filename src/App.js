import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { adminAccount } from "./constants/error-message-signIn";
import { useEffect, useState } from "react";
import { setItemWithLocal } from "./utils/process-data";

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

  function switchPage() {
    console.log(page);
    switch (page) {
      case 0:
        return <SignIn changeLink={() => setPage(1)} />;
      case 1:
        return <SignUp setPage={setPage} />;
      default:
        <SignIn changeLink={() => setPage(1)} />;
        break;
    }
  }

  return (
    <div className="App">
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {switchPage()}
    </div>
  );
}

export default App;
