import { useState } from "react";

const Blog = ({ blog, addLike }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    const [visible, setVisible] = useState(false);
    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const showBlogs = () => {
        setVisible(!visible);
    };

    const handleLike = () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
        };

        addLike(blog.id, updatedBlog);
    };

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible}>
                {blog.title} {blog.author}{" "}
                <button onClick={showBlogs}>view</button>
            </div>
            <div style={showWhenVisible}>
                {blog.title} {blog.author}
                <br />
                {blog.url}
                <br />
                likes {blog.likes} <button onClick={handleLike}>like</button>
                <br />
                {blog.user.name}
                <br />
                <button onClick={showBlogs}>hide</button>
            </div>
        </div>
    );
};

export default Blog;
