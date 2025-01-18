import { useState } from "react";
import blogService from "../services/blogs";

const NewBlogForm = ({ props }) => {
  const { user, setInfo, blogs, setBlogs } = props;
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
      setInfo({ message: `a new blog ${title} by ${author} added` });
      setTimeout(() => {
        setInfo({ message: "" });
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs(blogs.concat(newSavedBlog));
    } catch (exception) {
      setInfo({ message: exception.response.data.error, type: "error" });
      setTimeout(() => {
        setInfo({ message: "" });
      }, 5000);
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <p>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          >
          </input>
          <br />
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          >
          </input>
          <br />
          url:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          >
          </input>
        </p>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default NewBlogForm;
