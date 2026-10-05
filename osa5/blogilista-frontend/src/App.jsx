import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import BlogList from "./components/BlogList";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import LogInForm from "./components/LogInForm";
import Blog from "./components/Blog";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const padding = {
        padding: 5,
    };

    const match = useMatch("/:id");

    const blog = match
        ? blogs.find((blog) => blog.id === match.params.id)
        : null;

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogappUser");
        setUser(null);
        blogService.setToken(null);
        console.log(user);
    };

    const addLike = async (id, blogObject) => {
        await blogService.update(id, blogObject);
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : blogObject)));
    };

    const deleteBlog = async (id) => {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
    };

    if (user === null) {
        return (
            <>
                <div>
                    <Link style={padding} to="/">
                        blogs
                    </Link>
                    <Link style={padding} to="/login">
                        log in
                    </Link>
                </div>

                <Routes>
                    <Route
                        path="/login"
                        element={
                            <LogInForm
                                username={username}
                                password={password}
                                handleUsernameChange={({ target }) =>
                                    setUsername(target.value)
                                }
                                handlePasswordChange={({ target }) =>
                                    setPassword(target.value)
                                }
                                setUser={setUser}
                            />
                        }
                    />
                    <Route path="/" element={<BlogList blogs={blogs} />} />
                    <Route
                        path="/:id"
                        element={
                            <Blog
                                blog={blog}
                                addLike={addLike}
                                deleteBlog={deleteBlog}
                                loggedIn={false}
                            />
                        }
                    />
                </Routes>
            </>
        );
    }

    return (
        <>
            <div>
                <Link style={padding} to="/">
                    blogs
                </Link>
                <button onClick={() => handleLogout()}>logout</button>
            </div>
            <Routes>
                <Route path="/" element={<BlogList blogs={blogs} />} />
                <Route
                    path="/:id"
                    element={
                        <Blog
                            blog={blog}
                            addLike={addLike}
                            deleteBlog={deleteBlog}
                            loggedIn={true}
                        />
                    }
                />
            </Routes>
        </>
    );
};
export default App;
