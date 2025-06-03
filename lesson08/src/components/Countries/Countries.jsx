import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Countries.module.css';

const Countries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>CountriesRoute</h2>
      <ul className={styles.list}>
        {countries.map(c => (
          <li key={c.cca3} className={styles.listItem}>
            <img src={c.flags.svg} alt={c.name.common + ' flag'} width="25" />
            <Link to={`/countries/${c.name.common}`}>
              {c.name.official}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
