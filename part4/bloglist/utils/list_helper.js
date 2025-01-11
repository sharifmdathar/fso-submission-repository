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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
