import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("calls change and send handlers", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    const handleTitleChange = vi.fn();
    const handleAuthorChange = vi.fn();
    const handleUrlChange = vi.fn();

    render(
        <BlogForm
            handleSubmit={handleSubmit}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
            title=""
            author=""
            url=""
        />,
    );

    const titleInput = screen.getByLabelText("title");
    const authorInput = screen.getByLabelText("author");
    const urlInput = screen.getByLabelText("url");

    await user.type(titleInput, "Reaktin alkeet");
    await user.type(authorInput, "Matti Meikäläinen");
    await user.type(urlInput, "https://react");

    const sendButton = screen.getByText("create");
    await user.click(sendButton);

    expect(handleSubmit.mock.calls).toHaveLength(1);
});
