import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await blogService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
  };

  const handleNewBlog = async (e) => {
    e.preventDefault();
    try {
      const newSavedBlog = await blogService.createNewNote(
        { title, author, url },
        { Authorization: `Bearer ${user.token}` }
      );
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs(blogs.concat(newSavedBlog));
    } catch (e) {
      console.log(e);
    }
  };

  if (user === null)
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <p>
            username{" "}
            <input
              value={username}
              placeholder="Enter your username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
            <br />
            password{" "}
            <input
              value={password}
              placeholder="Enter your password"
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
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <p>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
          <br />
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
          <br />
          url:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </p>
        <button type="submit">create</button>
      </form>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
