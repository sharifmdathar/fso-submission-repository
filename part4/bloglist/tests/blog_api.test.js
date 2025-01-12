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
  const blogs = response.body
  assert(blogs.reduce((_, blog) => blog.id !== undefined, false))
});

after(async () => {
  await mongoose.connection.close();
});
