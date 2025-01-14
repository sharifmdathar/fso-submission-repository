const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const Blog = require("../models/blog");
const app = require("../app");
const api = supertest(app);

const initialBlogs = [
  {
    title: "Example1",
    author: "Mr. Example1",
    url: "example1.com",
    likes: 1,
    user: "67863072c82b0cd7bb549e7c",
  },
  {
    title: "Example2",
    author: "Mr. Example2",
    url: "example2.com",
    likes: 2,
    user: "67863072c82b0cd7bb549e7c",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

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

const getToken = async () => {
  const user = await api.post("/api/login").send({
    username: "username",
    password: "password",
  });
  return user.body.token;
};

test("a new blog post can be created", async () => {
  let response = await api.get("/api/blogs");
  const prevBlogsAmount = response.body.length;

  const token = await getToken();
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "ES7",
    url: "example.com",
    likes: 7,
    userId: "67862c8eef635657f513d287",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  response = await api.get("/api/blogs");
  const newBlogsAmount = response.body.length;
  assert.strictEqual(newBlogsAmount, prevBlogsAmount + 1);

  const titles = response.body.map((blog) => blog.title);
  assert.strict(titles.includes("async/await simplifies making async calls"));

  await api.post("/api/blogs").send(newBlog).expect(401);
});

test("if likes property is missing, then defaults to 0", async () => {
  const token = await getToken();
  const newBlog = {
    title: "blog without likes",
    author: "xyz",
    url: "example.com",
  };

  const savedBlog = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog);
  assert.strictEqual(savedBlog.body.likes, 0);
});

test("if title or url properties are missing, then response status is 400", async () => {
  const token = await getToken();
  const blogWithoutTitle = { url: "example.com" };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blogWithoutTitle)
    .expect(400);

  const blogWithoutUrl = { title: "Example" };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(blogWithoutUrl)
    .expect(400);
});

test("deleting a single blog post resource", async () => {
  const token = await getToken();
  await api
    .delete(`/api/blogs/invalidId`)
    .set("Authorization", `Bearer ${token}`)
    .expect(400);

  const newBlog = {
    title: "Example3",
    author: "Mr. Example3",
    url: "example3.com",
    likes: 3,
  };
  const savedBlogResponse = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog);

  await api
    .delete(`/api/blogs/${savedBlogResponse.body.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const allBlogsResponse = await api.get("/api/blogs");
  const idList = allBlogsResponse.body.map((b) => b.id);
  assert.strictEqual(idList.includes(savedBlogResponse.body.id), false);
});

test("updating the information of an individual blog post", async () => {
  const token = await getToken();
  await api
    .put(`/api/blogs/invalidId`)
    .set("Authorization", `Bearer ${token}`)
    .expect(400);

  const newBlog = {
    title: "Example4",
    author: "Mr. Example4",
    url: "example4.com",
    likes: 3,
  };
  const savedBlogResponse = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog);

  const updatedBlog = { ...newBlog, likes: 4 };
  await api
    .put(`/api/blogs/${savedBlogResponse.body.id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(updatedBlog)
    .expect(200);
});

after(async () => {
  await mongoose.connection.close();
});
