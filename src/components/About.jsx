import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import '../App.css'
import { addFruit, getFruits, deleteFruit } from '../utils/indexedDB';

function About() {
  const [fruits, setFruits] = useState([]);
  const [fruitName, setFruitName] = useState('');
  const [fruitPrice, setFruitPrice] = useState('');

  // Fetch Fruits from IndexedDB on component mount
  useEffect(() => {
    fetchFruits();
  }, []);

  const fetchFruits = async () => {
    const data = await getFruits();
    setFruits(data);
  };

  const handleAddFruit = async () => {
    if (fruitName && fruitPrice) {
      await addFruit({ name: fruitName, price: fruitPrice });
      setFruitName('');
      setFruits('');
      fetchFruits();
    }
  };

  const handleEditFruit = async (id) => {
    console.log("Edit Item Id: ", id)
    // await deleteFruit(id);
    // fetchFruits();
  };
  
  const handleDeleteFruit = async (id) => {
    await deleteFruit(id);
    fetchFruits();
  };

  return (
    <div>
      <h3 style={{ marginTop: '-100px' }}> CRUD: Fruit Price List - Input Data Stored in `IndexedDB`</h3>
      <p style={{ backgroundColor: '#E8E8E8',  marginTop: '5px', marginBottom: '20px', fontSize:'1.1rem'  }}> CRUD: Recipes /Recipe List - Data Fetched from API First, Then Stored in `Local stoage`</p>
      <div>
        <label style={{ marginRight: '3px',padding: '4px' }}>Fruit </label>
        <input
          type="text"
          value={fruitName}
          onChange={(e) => setFruitName(e.target.value)}
          placeholder="Enter name of fruit"
          style={{ marginRight: '20px' }}
        />
        <label style={{ marginRight: '3px', padding: '4px' }}>Price</label>
        <input
          type="number"
          value={fruitPrice}
          onChange={(e) => setFruitPrice(e.target.value)}
          placeholder="Enter price per unit"
          style={{ marginRight: '20px' }}
        />
        <Button onClick={handleAddFruit} style={{ backgroundColor:"green"}}>Add Fruit</Button>
      </div>
      <Table border="1" style={{ marginTop: '20px', width: '95%' }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Fruit</th>
            <th>Price per Unit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody >
          {Array.isArray(fruits) && fruits.map((fruit) => (
            <tr key={fruit.id}>
              <td>{fruit.id}</td>
              <td>{fruit.name}</td>
              <td>{fruit.price}</td>
              <td>
                <Button onClick={() => handleDeleteFruit(fruit.id)} style={{ backgroundColor:"orange"}}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default About;