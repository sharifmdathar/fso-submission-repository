import { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import Notification from "./Notification";

const LoginForm = ({ props }) => {
  const { setUser, info, setInfo } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await blogService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setInfo({ message: exception.response.data.error, type: "error" });
      setTimeout(() => {
        setInfo({ message: "" });
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification info={info} />
      <form onSubmit={handleLogin}>
        <p>
          username{" "}
          <input
            value={username}
            placeholder="Enter your username"
            onChange={({ target }) => setUsername(target.value)}
            type="username"
          >
          </input>
          <br />
          password{" "}
          <input
            value={password}
            placeholder="Enter your password"
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          >
          </input>
        </p>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  props: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  setInfo: PropTypes.func.isRequired,
};

export default LoginForm;
