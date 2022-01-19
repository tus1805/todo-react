import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { adminAccount } from "./constants/error-message-signIn";
import { useEffect } from "react";
import { setItemWithLocal } from "./utils/process-data";

function App() {
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
      <SignIn />
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
