import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
    const sortBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
        <div>
            <h2>blogs</h2>

            <ul>
                {sortBlogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/${blog.id}`}>
                            {blog.title} {blog.author}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
