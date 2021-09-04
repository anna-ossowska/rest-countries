import classes from './Banner.module.css';
import globeImage from '../../images/globe.png';

const Banner = () => {
  return (
    <header>
      <div className={classes['banner-container']}>
        <img className={classes['banner-img']} src={globeImage} alt="globe" />
        <div className={classes['banner-text']}>
          <h1>
            REST
            <br />
            Countries
          </h1>
          <p>Learn about the world around you</p>
        </div>
      </div>
    </header>
  );
};

export default Banner;
