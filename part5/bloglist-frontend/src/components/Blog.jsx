import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, allBlogs, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
                setBlogs(allBlogs.map((b) =>
                  b.id === blog.id ? { ...blog, likes: blog.likes + 1 } : b
                ));
                blogService.incrementLikes(blog);
              }}
            >
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
