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

export default { getAll, login };
