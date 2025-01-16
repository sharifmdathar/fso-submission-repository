import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await blogService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  if (user === null)
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
          <p>
            username{" "}
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            ></input>
            <br />
            password{" "}
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </p>
          <button type="submit">login</button>
        </form>
      </div>
    );

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
