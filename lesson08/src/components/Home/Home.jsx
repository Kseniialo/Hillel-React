import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import styles from './Home.module.css';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        const options = data.map(c => ({
          value: c.name.official,
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={c.flags.svg} width="20" alt="" />
              {c.name.official}
            </div>
          ),
          country: c
        }));
        setSelected(options[0]);
        setCountries(options);
      });
  }, []);

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
  };

  return (
    <div className={styles.wrapper}>
      <h2>HomeRoute</h2>
      {selected && (
        <div className={styles.selectBox}>
          <label>Select country: </label>
          <Select
            options={countries}
            value={selected}
            onChange={handleChange}
            className={styles.select}
          />
          <p className={styles.readMore}>
          <Link to={`/countries/${selected.country.name.common}`}>
            Read more about{" "}
            <img
              src={selected.country.flags.svg}
              alt={`Flag of ${selected.country.name.common}`}
              style={{ width: "20px", verticalAlign: "middle", marginRight: "5px" }}
            />
            {selected.country.name.official}
          </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
