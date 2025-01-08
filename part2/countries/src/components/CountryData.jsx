import React, { useEffect, useState } from "react";

const CountryData = ({ country, getCountryDetails }) => {
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    getCountryDetails(country).then((data) => setCountryInfo(data));
  }, []);

  if (countryInfo) {
    return (
      <>
        <h1>{countryInfo.flag} {countryInfo.name.common}</h1>
        <p>capital {countryInfo.capital}</p>
        <p>area {countryInfo.area}</p>
        <h4>languages:</h4>
        <ul>
          {Object.values(countryInfo.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={countryInfo.flags.png} />
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};
export default CountryData;
