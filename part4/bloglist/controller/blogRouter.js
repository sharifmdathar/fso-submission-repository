const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const { title, url, likes } = request.body;
  if (!title || !url) {
    return response.status(400).end();
  }
  const blog = new Blog({
    ...request.body,
    likes: likes ? likes : 0,
  });
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
  } catch (error) {
    console.log(error);
  }
  response.status(204).end();
});

module.exports = blogRouter;
