import { useEffect, useState } from "react";
import Notification from "./Notification";
import blogService from "../services/blogs";
import NewBlogForm from "./NewBlogForm";
import Blog from "./Blog";

const BlogsList = () => {
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState({ message: "" });
  const [blogs, setBlogs] = useState([]);
  const [newBlogVisible, setNewBlogVisible] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) setUser(JSON.parse(loggedUserJSON));
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info} />
      {user && (
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      )}

      {newBlogVisible === true
        ? (
          <NewBlogForm
            props={{
              user,
              setUser,
              info,
              setInfo,
              blogs,
              setBlogs,
              setNewBlogVisible,
            }}
          />
        )
        : <button onClick={() => setNewBlogVisible(true)}>new note</button>}
      <br />
      <br />
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default BlogsList;
