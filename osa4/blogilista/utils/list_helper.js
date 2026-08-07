const dummy = (blogs) => {
    // ...
};

const totalLikes = (array) => {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total += array[i].likes;
    }
    return total;
    return array.length === 0
        ? 0
        : array.reduce((sum, blog) => sum + blog.likes, 0);
};

module.exports = {
    dummy,
    totalLikes,
};
