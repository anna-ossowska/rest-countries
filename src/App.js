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

  // ------ SORTING -------

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

  // ------ TABLE 1 (COUNTRY LIST)-------

  const convertToSqMiles = (val) => {
    return Math.round(val * 0.3861);
  };

  // prettier-ignore
  const calcAvgPopulation = () => {
    const sum = countries.reduce((acc, curr) => acc + curr.population, 0)
    return (sum / countries.length).toFixed(1);
  }

  let countryWithMaxArea = { name: '', area: 0 };
  let countryWithMinArea = { name: '', area: 10 };

  const calcMaxArea = () => {
    countries.forEach((c) => {
      if (c.area > countryWithMaxArea.area) {
        countryWithMaxArea.name = c.name;
        countryWithMaxArea.area = c.area;
      }
    });

    return countryWithMaxArea.name;
  };

  const calcMinArea = () => {
    countries.forEach((c) => {
      if (c.area < countryWithMinArea.area && c.area !== null) {
        countryWithMinArea.name = c.name;
        countryWithMinArea.area = c.area;
      }
    });

    return countryWithMinArea.name;
  };

  // ------ TABLE 2 (LANGUAGE LIST)-------

  const langaugeData = [];

  countries.forEach((country) => {
    country.languages.forEach((language) => {
      langaugeData.push({
        language: language.name,
        countries: country.name,
        population: country.population,
      });
    });
  });

  const filterLanguages = (data) => {
    const filtered = [];

    data.forEach((item) => {
      const existing = filtered.filter((el) => {
        return el.language === item.language;
      });
      if (existing.length) {
        const existingIndex = filtered.indexOf(existing[0]);
        // prettier-ignore
        filtered[existingIndex].countries = filtered[existingIndex].countries.concat(item.countries);
        // prettier-ignore
        filtered[existingIndex].population += item.population;
      } else {
        if (typeof item.countries === 'string')
          item.countries = [item.countries];
        filtered.push(item);
      }

      return filtered.sort((a, b) => {
        if (a.population === b.population) return 0;
        if (a.population > b.population) return -1;
        return 1;
      });
    });

    return filtered;
  };

  return (
    <Fragment>
      <header>
        <h1>REST Countries</h1>
        <p>Learn about the world around you</p>
      </header>
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
                    <td>{convertToSqMiles(country.area)}</td>
                    <td>{(country.population / 1_000_000).toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <section>
          <h2>Summary</h2>
          <h3>Average population:</h3>
          <p>{calcAvgPopulation()}</p>

          <h3>Country with the biggest area</h3>
          <p>{calcMaxArea()}</p>

          <h3>Country with the smallest area</h3>
          <p>{calcMinArea()}</p>
        </section>
        <div></div>
        <section>
          <table>
            <thead>
              <tr>
                <td>Language</td>
                <td>Countries</td>
                <td>Population (mln)</td>
              </tr>
            </thead>
            <tbody>
              {filterLanguages(langaugeData).map((language) => {
                return (
                  <tr key={language.language}>
                    <td>{language.language}</td>
                    <td>{language.countries.join(', ')}</td>
                    <td>{(language.population / 1_000_000).toFixed(1)}</td>
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
