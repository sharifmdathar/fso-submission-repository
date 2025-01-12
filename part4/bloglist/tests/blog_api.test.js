const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);

test("all blogs are returned and are in JSON format", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, 2);
});

test("unique identifier is named id instead of _id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  assert(blogs.reduce((_, blog) => blog.id !== undefined, false));
});

test("a new blog post can be created", async () => {
  let response = await api.get("/api/blogs");
  const prevBlogsAmount = response.body.length;

  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "ES7",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  response = await api.get("/api/blogs");
  const newBlogsAmount = response.body.length;
  assert.strictEqual(newBlogsAmount, prevBlogsAmount + 1);

  const titles = response.body.map((blog) => blog.title);
  assert.strict(titles.includes("async/await simplifies making async calls"));
});

test("if likes property is missing, then defaults to 0", async () => {
  const newBlog = {
    title: "blog without likes",
    author: "xyz",
  };

  const savedBlog = await api.post("/api/blogs").send(newBlog);
  assert.strictEqual(savedBlog.body.likes, 0)
});

after(async () => {
  await mongoose.connection.close();
});
