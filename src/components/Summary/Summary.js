import Card from '../UI/Card';
import Heading from '../Layout/Heading';
import classes from './Summary.module.css';
import IconPopulation from './IconPopulation';
import IconMaxArea from './IconMaxArea';
import IconMinArea from './IconMinArea';

const Summary = (props) => {
  return (
    <Card>
      <Heading title="Summary" number="2" />
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.icon}>
            <IconPopulation />
          </div>
          <div className={classes.content}>
            <p>Average population</p>
            <h3>{props.population}</h3>
          </div>
        </div>

        <div className={classes.container}>
          <div className={classes.icon}>
            <IconMaxArea />
          </div>
          <div className={classes.content}>
            <p>Country with the biggest area</p>
            <h3>{props.maxArea}</h3>
          </div>
        </div>

        <div className={classes.container}>
          <div className={classes.icon}>
            <IconMinArea />
          </div>
          <div className={classes.content}>
            <p>Country with the biggest area</p>
            <h3>{props.maxArea}</h3>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Summary;
