import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AboutModal = ({ show, modalClose, saveUpdatedData, selected }) => {

  const [name, setName] = useState(selected.name)
  const [price, setPrice] = useState(selected.price)

  useEffect(() => {
    setName(selected.name || '');
    setPrice(selected.price || '');
  }, [selected]);

  const handleNameChange = (e) => {
    let newName = e.target.value;
    setName(newName);
  }
  const handlePriceChange = (e) => {
    let newPrice = e.target.value;
    setPrice(newPrice);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    let updatedItem = {
        id: selected.id, 
        name: name, 
        price: price
    };
    // console.log("updatedItem: ", updatedItem)
    saveUpdatedData(updatedItem);
    setName('')
    setPrice('')
    modalClose();
  };

  return (
    <Modal show={show} onHide={modalClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Update a List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ padding: '10px', width: '500px', margin: '0 auto' }}>
          <form>
            {/** Name */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <label style={{ marginRight: '5px', padding: '5px', whiteSpace: 'nowrap' }}>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                style={{ width: '668px', padding: '5px' }}
              />
            </div>
            {/** Price */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <label style={{ marginRight: '5px', padding: '5px', whiteSpace: 'nowrap' }}>Price:</label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={handlePriceChange}
                style={{ width: '630px', padding: '5px' }}
              />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={modalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AboutModal;