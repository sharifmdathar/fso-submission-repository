const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const { title, url, likes } = request.body;
    if (!title || !url) {
      return response.status(400).end();
    }
    const user = request.user;

    const blog = new Blog({
      ...request.body,
      likes: likes ? likes : 0,
      user: user.id,
    });

    try {
      const savedBlog = await blog.save();
      response.status(201).json(savedBlog);

      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const user = request.user;
    try {
      const blog = await Blog.findById(request.params.id);
      if (!blog)
        return response.status(404).json({ error: "blog does not exist" });
      if (blog.user.toString() === user._id.toString())
        await Blog.findByIdAndDelete(request.params.id);
      else
        response.status(403).json({ error: "this blog belongs to another user" });
    } catch (error) {
      next(error);
    }
    response.status(204).end();
  }
);

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
