import { useEffect, useState } from "react";
import Notification from "./Notification";
import blogService from "../services/blogs";
import NewBlogForm from "./NewBlogForm";
import Blog from "./Blog";

const BlogsList = ({ props }) => {
  const { user, setUser, info, setInfo } = props;
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
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
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <NewBlogForm props={{ user, setInfo, blogs, setBlogs }} />
      <br />
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default BlogsList;
