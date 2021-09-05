import React, { Fragment, useState, useEffect } from 'react';
import Banner from './components/Layout/Banner';
import Card from './components/UI/Card';
import './App.css';
import Heading from './components/Layout/Heading';
import SortDropdown from './components/Layout/SortDropdown';
import Summary from './components/Summary/Summary';
import TableCountries from './components/Tables/TableCountries';
import TableLanguages from './components/Tables/TableLanguages';
import Wrapper from './components/UI/Wrapper';

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
      <Banner />
      <Wrapper>
        <Card>
          <Heading title="Countires" number="1" />
          <SortDropdown onSetSortType={setSortType} />
          <TableCountries
            countries={sortedCountries}
            onConvert={convertToSqMiles}
          />
        </Card>
        <Summary
          population={calcAvgPopulation()}
          maxArea={calcMaxArea()}
          minArea={calcMinArea()}
        />

        <Card>
          <Heading title="Languages" number="3" />
          <TableLanguages languages={filterLanguages(langaugeData)} />
        </Card>
      </Wrapper>
    </Fragment>
  );
}

export default App;
