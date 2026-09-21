const BlogForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url,
}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        title:
                        <input value={title} onChange={handleTitleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        author:
                        <input value={author} onChange={handleAuthorChange} />
                    </label>
                </div>
                <div>
                    <label>
                        url:
                        <input value={url} onChange={handleUrlChange} />
                    </label>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default BlogForm;
