import { useState, useEffect } from "react";

import Blog from "./Blog";
import Notification from "./Notification";
import blogService from "../services/blogs";

const BlogList = ({ blogs }) => {
    const [user, setUser] = useState(null);
    const [setBlogs] = useState(null);

    const addLike = async (id, blogObject) => {
        const updatedBlog = await blogService.update(id, blogObject);
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
    };

    const deleteBlog = async (id) => {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
    };

    const sortBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    if (user === null) {
        return (
            <div>
                <h2>blogs</h2>
                {sortBlogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={blog.user.name}
                        addLike={addLike}
                        deleteBlog={deleteBlog}
                    />
                ))}
            </div>
        );
    }

    return (
        <div>
            <h2>blogs</h2>

            {sortBlogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={blog.user.name}
                    addLike={addLike}
                    deleteBlog={deleteBlog}
                />
            ))}
        </div>
    );
};

export default BlogList;
