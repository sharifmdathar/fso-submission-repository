import { useEffect, useState } from "react";
import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState({ message: "" });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) setUser(JSON.parse(loggedUserJSON));
  }, []);

  return user === null
    ? <LoginForm props={{ setUser, info, setInfo }} />
    : <BlogsList props={{ user, setUser, info, setInfo }} />;
};

export default App;
