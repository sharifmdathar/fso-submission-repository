const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const { title, url, likes, userId } = request.body;
  if (!title || !url) {
    return response.status(400).end();
  }

  const user = await User.findById(userId);

  const blog = new Blog({
    ...request.body,
    likes: likes ? likes : 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
});

blogRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
  } catch (error) {}
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
