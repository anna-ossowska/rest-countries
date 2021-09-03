const CountryData = (props) => {
  return (
    <tr key={props.alpha2Code}>
      <td>{props.name}</td>
      {/* <td>{country.region}</td>
      <td>{country.area}</td>
      <td>{country.population}</td> */}
    </tr>
  );
};

export default CountryData;
