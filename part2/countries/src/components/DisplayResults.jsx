import countryServices from "./../services/country";
import CountryData from "./CountryData";

const DisplayResults = ({ countries, filter, setFilter }) => {
  if (filter === "") return null;
  const isFilterPresent = (c) => c.toLowerCase().includes(filter.toLowerCase());
  const filteredCountries = countries.filter((c) => isFilterPresent(c));
  const total = filteredCountries.length;

  if (total > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (total > 1) {
    return (
      <>
        <p> Total: {total}</p>
        {filteredCountries.map((c) => (
          <p key={c}>
            {c} <button onClick={() => setFilter(c)}>show</button>
          </p>
        ))}
      </>
    );
  } else if (total === 1) {
    return <CountryData country={filteredCountries[0]} />;
  } else {
    return <p>No results found. Please refine your query</p>;
  }
};

export default DisplayResults;
