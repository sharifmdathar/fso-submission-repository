import axios from "axios";
const baseUrl = "http://localhost:3003";

const getAll = async () => {
  const request = await axios.get(`${baseUrl}/api/blogs`);
  return request.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/api/login`, credentials);
  return response.data;
};

const createNewNote = async (blogData, headers) => {
  const response = await axios.post(`${baseUrl}/api/blogs`, blogData, {
    headers: headers,
  });
  return response.data;
};

const incrementLikes = async (blog) => {
  const response = await axios.put(`${baseUrl}/api/blogs/${blog.id}`, {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id,
  });
  return response.data;
};

const remove = async (id, headers) => {
  await axios.delete(`${baseUrl}/api/blogs/${id}`, {
    headers: headers,
  });
};

export default { getAll, login, createNewNote, incrementLikes, remove };
