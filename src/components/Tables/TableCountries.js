import { Fragment } from 'react';
import Heading from '../Layout/Heading';
import SortDropdown from '../Layout/SortDropdown';
import Card from '../UI/Card';
import classes from './TableCountries.module.css';

const TableCountries = (props) => {
  return (
    <Fragment>
      <Card>
        <Heading title="Countires" number="1" />
        <SortDropdown onSetSortType={props.onSetSortType} />
        <table className={classes.countries}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Region</td>
              <td>Area (mi²)</td>
              <td>Population (mln)</td>
            </tr>
          </thead>
          <tbody>
            {props.countries.map((country) => {
              return (
                <tr key={country.alpha2Code}>
                  <td className={classes.name}>{country.name}</td>
                  <td className={classes.region}>{country.region}</td>
                  <td className={classes.area}>
                    {props.onConvert(country.area)}
                  </td>
                  <td className={classes.population}>
                    {(country.population / 1_000_000).toFixed(1)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </Fragment>
  );
};

export default TableCountries;
