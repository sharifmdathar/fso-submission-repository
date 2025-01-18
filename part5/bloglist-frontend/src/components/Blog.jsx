import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ props }) => {
  const { blog, blogs, user, setBlogs, setInfo } = props;
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id, {
          Authorization: `Bearer ${user?.token}`,
        });
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (exception) {
        setInfo({ message: exception.response.data.error, type: "error" });
        setTimeout(() => {
          setInfo({ message: "" });
        }, 5000);
      }
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>view</button>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{" "}
            <button
              onClick={() => {
                setBlogs(blogs.map((b) =>
                  b.id === blog.id ? { ...blog, likes: blog.likes + 1 } : b
                ));
                blogService.incrementLikes(blog);
              }}
            >
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          <p>
            {user?.username === blog.user.username && (
              <button
                onClick={() => handleRemove(blog)}
              >
                remove
              </button>
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default Blog;
