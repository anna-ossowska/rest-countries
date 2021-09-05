import Heading from '../Layout/Heading';
import Card from '../UI/Card';
import classes from './TableLanguages.module.css';

const TableLanguages = (props) => {
  return (
    <Card>
      <Heading title="Languages" number="3" />
      <table className={classes.languages}>
        <thead>
          <tr>
            <td>Language</td>
            <td>Countries</td>
            <td>Population (mln)</td>
          </tr>
        </thead>
        <tbody>
          {props.languages.map((language) => {
            return (
              <tr key={language.language}>
                <td className={classes.language}>{language.language}</td>
                <td className={classes.countries}>
                  {language.countries.join(', ')}
                </td>
                <td className={classes.population}>
                  {(language.population / 1_000_000).toFixed(1)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default TableLanguages;
