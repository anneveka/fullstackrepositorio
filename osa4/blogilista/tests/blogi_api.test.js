const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Note = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
    {
        title: "Reactin perusteet",
        author: "Matti Meikäläinen",
        url: "https://react.dev",
        likes: 5,
        id: "6a327028d674a38e8b4227c8",
    },
    {
        title: "Reactin alkeet",
        author: "Matti Muukalainen",
        url: "https://react.dev",
        likes: 10,
        id: "6a32706ed674a38e8b4227cb",
    },
];

beforeEach(async () => {
    await Note.deleteMany({});
    let noteObject = new Note(initialBlogs[0]);
    await noteObject.save();
    noteObject = new Note(initialBlogs[1]);
    await noteObject.save();
});

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((e) => e.title);
    assert(titles.includes("Reactin perusteet"));
});

test.only("indentifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
        assert(blog.id !== undefined);
        assert(blog._id === undefined);
    });
});

after(async () => {
    await mongoose.connection.close();
});
