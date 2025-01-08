import React, { useEffect, useState } from "react";
import countryServices from "./../services/country";

const CountryData = ({ country }) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState("");

  useEffect(() => {
    countryServices.getCountryDetails(country).then((data) => {
      setCountryInfo(data);
      countryServices.getWeatherDetails(data.capital).then((d) => {
        setWeatherInfo(d.data.current);
      });
    });
  }, []);

  if (countryInfo) {
    const capital = countryInfo.capital;
    return (
      <>
        <h1>
          {countryInfo.flag} {countryInfo.name.common}
        </h1>
        <p>capital {capital}</p>
        <p>area {countryInfo.area}</p>
        <h4>languages:</h4>
        <ul>
          {Object.values(countryInfo.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={countryInfo.flags.png} />
        <h3>Weather in {capital}</h3>
        <p>temperature {weatherInfo.temp_c} Celsius</p>
        <img src={"https:" + weatherInfo?.condition?.icon} />
        <p>wind {weatherInfo.wind_mph} mph</p>
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};
export default CountryData;
