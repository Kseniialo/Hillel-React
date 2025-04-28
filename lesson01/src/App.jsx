const App = ({ title = "Animal Groups", data = [] }) => {
  return (
  <>
  <table className="animal-table">
  <caption>{title}</caption>
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
