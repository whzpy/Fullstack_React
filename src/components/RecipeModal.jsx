import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RecipeModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        todos
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save New Recipe
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeModal;