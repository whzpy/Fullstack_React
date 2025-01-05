import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

function App() {
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 28, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 34, city: 'Los Angeles' },
    { id: 3, name: 'Sam Green', age: 45, city: 'Chicago' },
    { id: 4, name: 'Emily Brown', age: 29, city: 'Houston' },
    { id: 5, name: 'Michael Blue', age: 32, city: 'Phoenix' },
  ];

  // State for the table data and sorting configuration
  const [tableData, setTableData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Function to handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setTableData(sortedData);
  };

  return (
    <div className="container mt-4">
      <h2>Sortable React Bootstrap Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Button variant="link" onClick={() => handleSort('id')}>
                ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </Button>
            </th>
            <th>
              <Button variant="link" onClick={() => handleSort('name')}>
                Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </Button>
            </th>
            <th>
              <Button variant="link" onClick={() => handleSort('age')}>
                Age {sortConfig.key === 'age' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </Button>
            </th>
            <th>
              <Button variant="link" onClick={() => handleSort('city')}>
                City {sortConfig.key === 'city' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.city}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;