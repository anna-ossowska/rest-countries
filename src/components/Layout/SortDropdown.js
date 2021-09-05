import classes from './SortDropdown.module.css';

const SortDropdown = (props) => {
  const onChangeHandler = (e) => {
    props.onSetSortType(e.target.value);
  };

  return (
    <section className={classes.wrapper}>
      <div className={classes.container}>
        <h3 className={classes.heading}>Sort by:</h3>
        <select
          name="country-info"
          id="country-info"
          onChange={onChangeHandler}
        >
          <option value="name">Name</option>
          <option value="population" defaultValue>
            Population
          </option>
          <option value="area">Area</option>
        </select>
      </div>
    </section>
  );
};

export default SortDropdown;
