const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
    {
        title: "Reactin perusteet",
        author: "Matti Meikäläinen",
        url: "https://react.dev",
        likes: 5,
    },
    {
        title: "Reactin alkeet",
        author: "Matti Muukalainen",
        url: "https://react.dev",
        likes: 10,
    },
];

const nonExistingId = async () => {
    const blog = new Blog({
        title: "willremovethissoon",
        author: "Testaaja",
        url: "https://testi.com",
    });
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
};
