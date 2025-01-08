import { useEffect, useState } from "react";
import countryServices from "./services/country";
import DisplayResults from "./components/DisplayResults";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryServices.getAll().then((data) => {
      data.map((c) => {
        const commonName = c.name.common;
        if (commonName) {
          setCountries((prevCountries) => prevCountries.concat(commonName));
        } else {
          console.error("commonName is undefined or null");
        }
      });
    });
  }, []);

  return (
    <>
      <p>
        find countries{" "}
        <input
          placeholder="Enter Country Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </p>
      <DisplayResults countries={countries} filter={filter} />
    </>
  );
};

export default App;
