import { useParams, useNavigate, Link } from "react-router-dom";

const Blog = ({ blog, addLike, deleteBlog, user }) => {
    const id = useParams().id;
    const navigate = useNavigate();

    if (!blog) {
        return null;
    }

    const handleLike = () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
        };
        addLike(id, updatedBlog);
    };

    const handleDelete = () => {
        if (window.confirm(`Delete blog "${blog.title}"?`)) {
            deleteBlog(id);
            navigate("/");
        }
    };

    return (
        <div>
            <li>
                <h2>
                    {blog.author}: {blog.title}
                </h2>
                <br />
                <Link to={blog.url}>{blog.url}</Link>
                <br />
                likes {blog.likes}{" "}
                {user !== null && <button onClick={handleLike}>like</button>}
                <br />
                Added by {blog.user.name}
                <br />
                {user !== null && blog.user.name === user.name && (
                    <button onClick={handleDelete}>remove</button>
                )}
            </li>
        </div>
    );
};

export default Blog;
