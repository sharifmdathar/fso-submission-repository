import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const addPerson = (personData) =>
  axios.post(baseUrl, personData).then((res) => res.data);

const deletePerson = id => 
  axios.delete(`${baseUrl}/${id}`)

export default { getAll, addPerson, deletePerson };
