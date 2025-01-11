const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, item) => (item.likes > fav.likes ? item : fav), {
    likes: 0,
  });
};

const mostBlogs = (blogs) => {
  const groupedByAuthor = lodash.groupBy(blogs, "author");
  const authorCounts = lodash.map(groupedByAuthor, (authorBlogs, author) => ({
    author,
    blogs: authorBlogs.length,
  }));
  const mostBlogsAuthor = lodash.maxBy(authorCounts, "blogs");
  return mostBlogsAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
