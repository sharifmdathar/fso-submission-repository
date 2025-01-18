import { useState } from "react";
import LoginForm from "./LoginForm";
import blogService from "../services/blogs";

const NewBlogForm = ({ props }) => {
  const { user, setUser, info, setInfo, blogs, setBlogs, setNewBlogVisible } =
    props;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = async (e) => {
    e.preventDefault();
    try {
      const newSavedBlog = await blogService.createNewNote(
        { title, author, url },
        { Authorization: `Bearer ${user.token}` },
      );
      setBlogs(blogs.concat(newSavedBlog));
      setInfo({ message: `a new blog ${title} by ${author} added` });
      setTimeout(() => {
        setInfo({ message: "" });
      }, 5000);
      setNewBlogVisible(false);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      setInfo({ message: exception.response.data.error, type: "error" });
      setTimeout(() => {
        setInfo({ message: "" });
      }, 5000);
    }
  };

  return (
    <>
      {!user ? <LoginForm props={{ setUser, info, setInfo }} /> : (
        <div>
          <h2>create new blog</h2>
          <form onSubmit={handleNewBlog}>
            <div>
              <label>
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Author:
                <input
                  type="text"
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                URL:
                <input
                  type="text"
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}
                />
              </label>
            </div>
            <button type="submit">Create</button><br />
            <button type="button" onClick={() => setNewBlogVisible(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default NewBlogForm;
