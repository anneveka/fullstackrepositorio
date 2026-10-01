import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import BlogList from "./components/BlogList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogInForm from "./components/LogInForm";

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

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogappUser");
        setUser(null);
        blogService.setToken(null);
        console.log(user);
    };

    if (user === null) {
        return (
            <Router>
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
                </Routes>
            </Router>
        );
    }

    return (
        <Router>
            <div>
                <Link style={padding} to="/">
                    blogs
                </Link>
                <button onClick={() => handleLogout()}>logout</button>
            </div>
            <Routes>
                <Route path="/" element={<BlogList blogs={blogs} />} />
            </Routes>
        </Router>
    );
};
export default App;
