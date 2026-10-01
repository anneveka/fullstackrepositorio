import loginService from "../services/login";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";
import { useState } from "react";

const LoginForm = ({
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
    setUser,
}) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });
            console.log("teetee");
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user),
            );
            blogService.setToken(user.token);
            setUser(user);
            navigate("/");
        } catch {
            setErrorMessage("wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };
    return (
        <div>
            <h2>Log in to application</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        username
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </label>
                </div>
                <button id="login-button" type="submit">
                    login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
