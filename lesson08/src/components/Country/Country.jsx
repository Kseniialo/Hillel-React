import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Country = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/name/' + name)
      .then(res => res.json())
      .then(data => setCountry(data[0]));
  }, [name]);

  const renderList = (obj) => {
    if (typeof obj !== 'object' || obj === null) return <span>{String(obj)}</span>;
    return (
      <ul>
        {Object.entries(obj).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {renderList(value)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>CountryRoute</h2>
      {country ? renderList(country) : <p>Loading...</p>}
    </div>
  );
};

export default Country;
