import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import '../App.css'
import { addFruit, getFruits, editFruit, deleteFruit } from '../utils/indexedDB';
import AboutModal from './AboutModal';

function About() {
  const [fruits, setFruits] = useState([]);
  const [fruitName, setFruitName] = useState('');
  const [fruitPrice, setFruitPrice] = useState('');
  const [selected, setSelected] = useState('');

  // Fetch Fruits from IndexedDB on component mount
  useEffect(() => {
    fetchFruits();
  }, []);

  // Modal
  const [show, setShow] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  const fetchFruits = async () => {
    const data = await getFruits();
    setFruits(data);
  };

  const handleAddFruit = async () => {
    if (fruitName && fruitPrice) {
      await addFruit({ name: fruitName, price: fruitPrice });
      setFruitName('');
      setFruitPrice('');
      fetchFruits();
    }
  };

  const handleUpdateClick = (id) => {
    let selectedFruit = fruits.filter((fruit) => fruit.id === id)
    // console.log("Update Click: ", selectedFruit[0])
    setSelected(selectedFruit[0])
    modalShow();
  };

  const saveUpdatedData = (updatedItem) => {
    // console.log("Updated item to save: ", updatedItem);
    editFruit(updatedItem);
    fetchFruits();
    setSelected('')
  };

  const handleDeleteFruit = async (id) => {
    await deleteFruit(id);
    fetchFruits();
  };

  return (
    <div>
      <h3 style={{ marginTop: '-100px' }}> CRUD: Fruit Price List - Input Data Stored in `IndexedDB`</h3>
      <p style={{ backgroundColor: '#E8E8E8',  marginTop: '5px', marginBottom: '20px', fontSize:'1.1rem'  }}> CRUD: Recipes /Recipe List - Data Fetched from API First, Then Stored in `Local storage`</p> <br></br>
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
      { selected && <AboutModal show = {show} modalClose = {modalClose} saveUpdatedData = {saveUpdatedData} selected = {selected} /> }
      <Table border="1" style={{ marginTop: '20px', width: '95%' }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Fruit</th>
            <th>Price per Unit</th>
            <th>Update</th>
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
                <Button onClick={() => handleUpdateClick(fruit.id)} style={{ backgroundColor:"#7070FF"}}>Update</Button>
              </td>
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