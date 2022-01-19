import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const router = [
  {
    name: "main",
    value: "/",
  },
  {
    name: "project-admin",
    value: "/project-admin",
  },
  {
    name: "user-admin",
    value: "/user-admin",
  },
  {
    name: "sign-in",
    value: "/sign-in",
    page: <SignIn />,
  },
  {
    name: "sign-up",
    value: "/sign-up",
    page: <SignUp/>
  },
];
