const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const User = require("../models/user");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const exampleUser = User({
    username: "example",
    name: "Example",
    password: "example",
  });
  await exampleUser.save();
});

describe("invalid users are not created", () => {
  describe("username tests", () => {
    test("user without username", async () => {
      const user = { name: "Example1", password: "example1" };
      await api.post("/api/users").send(user).expect(400);
    });

    test("user with username length less than 3", async () => {
      const user = { username: "ex", name: "Example2", password: "example2" };
      await api.post("/api/users").send(user).expect(400);
    });

    test("user without unique username", async () => {
      const user = {
        username: "example",
        name: "Example",
        password: "example",
      };
      await api.post("/api/users").send(user).expect(400);
    });
  });

  describe("password tests", () => {
    test("user without password", async () => {
      const user = { name: "Example1", username: "example1" };
      await api.post("/api/users").send(user).expect(400);
    });

    test("user with password length less than 3", async () => {
      const user = { password: "ex", name: "Example2", username: "example2" };
      await api.post("/api/users").send(user).expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
