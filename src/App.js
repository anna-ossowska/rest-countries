import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [sortType, setSortType] = useState('name');

  const fetchCountries = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');

    try {
      if (!response.ok) {
        throw new Error('Something went wrong. Data not found.');
      }
      const data = await response.json();
      setCountries(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  let sortedCountries = countries;

  // SORTING
  const sortByName = () => {
    sortedCountries = countries.sort((a, b) =>
      a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
    );
  };

  const sortByPopulation = () => {
    sortedCountries = countries.sort((a, b) => {
      if (a.population === b.population) return 0;
      if (a.population > b.population) return -1;
      return 1;
    });
  };

  const sortByArea = () => {
    sortedCountries = countries.sort((a, b) => {
      if (a.area === b.area) return 0;
      if (a.area > b.area) return -1;
      return 1;
    });
  };

  if (sortType === 'name') sortByName();
  if (sortType === 'population') sortByPopulation();
  if (sortType === 'area') sortByArea();

  console.log(sortType);

  return (
    <Fragment>
      <main>
        <section>
          <h3>Sort by:</h3>
          <select
            name="country-info"
            id="country-info"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="population" defaultValue>
              Population
            </option>
            <option value="area">Area</option>
          </select>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Region</td>
                <td>Area (mi²)</td>
                <td>Population (mln)</td>
              </tr>
            </thead>
            <tbody>
              {sortedCountries.map((country) => {
                return (
                  <tr key={country.alpha2Code}>
                    <td>{country.name}</td>
                    <td>{country.region}</td>
                    <td>{country.area}</td>
                    <td>{country.population}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </Fragment>
  );
}

export default App;
