import classes from './Heading.module.css';

const Heading = (props) => {
  return (
    <div className={classes.heading}>
      <h2>
        <span className={classes.number}>{props.number}</span>
        {props.title}
      </h2>
    </div>
  );
};

export default Heading;
