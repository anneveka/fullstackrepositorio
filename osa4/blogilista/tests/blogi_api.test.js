const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
});

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((e) => e.title);
    assert(titles.includes("Reactin perusteet"));
});

test("indentifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
        assert(blog.id !== undefined);
        assert(blog._id === undefined);
    });
});

test("a valid blog can be added ", async () => {
    const newBlog = {
        title: "Testiblogi",
        author: "Testaaja",
        url: "https://testi.com",
        likes: 0,
    };

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((b) => b.title);
    assert(contents.includes("Testiblogi"));
});

test("blog without likes defaults to 0", async () => {
    const newBlog = {
        title: "Testiblogi",
        author: "Testaaja",
        url: "https://testi.com",
    };

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const addedBlog = response.body.find((blog) => blog.title === "Testiblogi");
    assert.strictEqual(addedBlog.likes, 0);
});

test("blog without title is not added", async () => {
    const newBlog = {
        author: "Testaaja",
        url: "https://testi.com",
        likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    const contents = blogsAtEnd.map((b) => b.title);
    assert(!contents.includes(blogToDelete.title));
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

after(async () => {
    await mongoose.connection.close();
});
