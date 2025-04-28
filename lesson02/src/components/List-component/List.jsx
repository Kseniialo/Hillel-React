import React, { useEffect, useState } from 'react';
import './List.css';

function List({ animals = [] }) {
  const [list, setList] = useState(animals);

  useEffect(() => {
    const interval = setInterval(() => {
      setList(previousList => {
        const inactiveItems = previousList.filter(item => !item.active);

        if (inactiveItems.length === 0) {
          clearInterval(interval);
          return previousList;
        }

        const randomIndex = Math.floor(Math.random() * inactiveItems.length);
        const randomItem = inactiveItems[randomIndex];

        return previousList.map(item =>
          item.type === randomItem.type
            ? { ...item, active: true }
            : item
        );
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <table className="animal-table">
      <tbody>
        {list.map((animal, index) => (
          <tr key={index} className={animal.active ? 'active' : ''}>
            <td>{animal.type}</td>
            <td>{animal.icon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default List;