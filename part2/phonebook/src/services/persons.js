import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const addPerson = (personData) =>
  axios.post(baseUrl, personData).then((res) => res.data);

const deletePerson = id => 
  axios.delete(`${baseUrl}/${id}`)

const updatePerson = (id, personData) =>
  axios.put(`${baseUrl}/${id}`, personData).then(res => res.data)

export default { getAll, addPerson, deletePerson, updatePerson };
