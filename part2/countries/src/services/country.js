import axios from "axios";

const weatherApi = import.meta.env.VITE_WEATHER_API
const weatherBaseUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApi}`
const countryBaseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => axios.get(`${countryBaseUrl}/all`).then((res) => res.data);

const getCountryDetails = (country) =>
  axios.get(`${countryBaseUrl}/name/${country}`).then((res) => res.data);

const getWeatherDetails = (location) =>
  axios.get(`${weatherBaseUrl}&q=${location}`)

export default { getAll, getCountryDetails, getWeatherDetails};
