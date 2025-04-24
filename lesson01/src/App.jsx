const App = ({ title = "Animal Groups", data = [] }) => {
  return (
  <>
  <h1>{title}</h1>
  <table className="animal-table">
    <tbody>
      {data.map((group) => (
        <tr key={group.id}>
          <th>{group.category}</th>
          {group.animals.map((animal, index) => (
            <td key={index} style={{ color: animal.color }}>
              {animal.name}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  </>)
}

export default App
