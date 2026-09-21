import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [infoMessage, setInfoMessage] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);
    0;

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const addBlog = (event) => {
        event.preventDefault();
        const blogObject = {
            title: title,
            author: author,
            url: url,
        };

        blogService.create(blogObject).then((returnedBlog) => {
            setBlogs(blogs.concat(returnedBlog));
            setNewBlog("");
        });
        setInfoMessage(`a new blog ${title} by ${author} added`);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user),
            );
            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch {
            setErrorMessage("wrong username or password");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const blogForm = () => (
        <Togglable buttonLabel="create new blog">
            <BlogForm
                title={title}
                author={author}
                url={url}
                handleTitleChange={({ target }) => setTitle(target.value)}
                handleAuthorChange={({ target }) => setAuthor(target.value)}
                handleUrlChange={({ target }) => setUrl(target.value)}
                handleSubmit={addBlog}
            />
        </Togglable>
    );

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogappUser");
        setUser(null);
        blogService.setToken(null);
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                <label>
                    username
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </label>
            </div>
            <button type="submit">login</button>
        </form>
    );

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification message={errorMessage} />
                {!user && loginForm()}
                <form></form>
            </div>
        );
    }
    return (
        <div>
            <h2>blogs</h2>
            <Notification message={infoMessage} />
            {user && (
                <div>
                    <p>
                        {user.name} logged in
                        <button onClick={() => handleLogout()}>logout</button>
                    </p>{" "}
                    {blogForm()}
                </div>
            )}
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
