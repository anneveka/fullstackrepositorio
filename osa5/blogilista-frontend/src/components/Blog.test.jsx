import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect } from "vitest";

test("renders title and author only", () => {
    const blog = {
        title: "Reaktin alkeet",
        author: "Matti Meikäläinen",
        url: "https://react",
        likes: 0,
    };

    const blogUser = {
        name: "Anna",
    };

    render(<Blog blog={blog} user={blogUser} />);

    const titleElement = screen.findByText("Reaktin alkeet");
    expect(titleElement).toBeDefined();

    const urlElement = screen.queryByText("https://react");
    expect(urlElement).toBeNull();

    const likesElement = screen.queryByText(0);
    expect(likesElement).toBeNull();
});

test("renders everything when opened", async () => {
    const blog = {
        title: "Reaktin alkeet",
        author: "Matti Meikäläinen",
        url: "https://react",
        likes: 0,
    };

    const blogUser = {
        name: "Anna",
    };

    render(<Blog blog={blog} user={blogUser} />);

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const titleElement = screen.findByText("Reaktin alkeet");
    expect(titleElement).toBeDefined();

    const urlElement = screen.queryByText("https://react");
    expect(urlElement).toBeDefined();

    const likesElement = screen.queryByText(0);
    expect(likesElement).toBeDefined();

    const userElement = screen.queryByText("Anna");
    expect(userElement).toBeDefined();
});

test("clicking the like button calls event handler twice", async () => {
    const blog = {
        title: "Reaktin alkeet",
        author: "Matti Meikäläinen",
        url: "https://react",
        likes: 0,
    };

    const blogUser = {
        name: "Anna",
    };

    const mockHandler = vi.fn();

    render(<Blog blog={blog} user={blogUser} addLike={mockHandler} />);

    const user = userEvent.setup();

    const likebutton = screen.getByText("like");
    await user.dblClick(likebutton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
});
