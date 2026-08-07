const dummy = (blogs) => {
    // ...
};

const totalLikes = (array) => {
    return array.length === 0
        ? 0
        : array.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (array) => {
    return array.length === 0
        ? 0
        : array.reduce(
              (max, blog) => (blog.likes > max.likes ? blog : max),
              array[0],
          );
};

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
};
