import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const RecipeModal = ({ show, handleClose, addNewRecipeHandler }) => {

  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    servings: '',
    difficulty: '',
    cuisine: '',
    caloriesPerServing: '',
    tags: '',
    userId: '',
    image: '',
    rating: '',
    reviewCount: '',
    mealType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Convert numbers to numeric types where necessary
    const newValue = ['prepTimeMinutes', 'cookTimeMinutes', 'servings', 'caloriesPerServing', 'rating', 'reviewCount'].includes(name)
      ? Number(value)
      : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // console.log('Form Submitted:', formData);
    addNewRecipeHandler(formData);
    // Reset the form
    setFormData({
      name: '',
      ingredients: '',
      instructions: '',
      prepTimeMinutes: '',
      cookTimeMinutes: '',
      servings: '',
      difficulty: '',
      cuisine: '',
      caloriesPerServing: '',
      tags: '',
      userId: '',
      image: '',
      rating: '',
      reviewCount: '',
      mealType: '',
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ padding: '10px', width: '800px', margin: '0 auto' }}>
          <form>

            {/** Name */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <label style={{ marginRight: '5px', padding: '5px', whiteSpace: 'nowrap' }}>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter recipe name"
                style={{ width: '668px', padding: '5px' }}
              />
            </div>

            {/** Ingredients */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <label style={{ marginRight: '5px', padding: '5px', whiteSpace: 'nowrap' }}>Ingredients:</label>
              <input
                type="text"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                placeholder="List ingredients"
                style={{ width: '630px', padding: '5px' }}
              />
            </div>

            {/** Instructions */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <label style={{ marginRight: '5px', padding: '5px', whiteSpace: 'nowrap' }}>Instructions:</label>
              <input
                type="text"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                placeholder="List instructions"
                style={{ width: '626px', padding: '5px' }}
              />
            </div>

            {/** Other fields */}
            {[
              { label: 'Prep Time (minutes)', name: 'prepTimeMinutes', type: 'number' },
              { label: 'Cook Time (minutes)', name: 'cookTimeMinutes', type: 'number' },
              { label: 'Servings', name: 'servings', type: 'number' },
              { label: 'Difficulty', name: 'difficulty', type: 'text' },
              { label: 'Cuisine', name: 'cuisine', type: 'text' },
              { label: 'Calories Per Serving', name: 'caloriesPerServing', type: 'number' },
              { label: 'Tags', name: 'tags', type: 'text' },
              { label: 'User ID', name: 'userId', type: 'text' },
              { label: 'Image URL', name: 'image', type: 'text' },
              { label: 'Rating', name: 'rating', type: 'number' },
              { label: 'Review Count', name: 'reviewCount', type: 'number' },
              { label: 'Meal Type', name: 'mealType', type: 'text' },
            ].map(({ label, name, type }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <label style={{ marginRight: '5px', padding: '5px', whiteSpace: 'nowrap' }}>{label}:</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  style={{ width: '500px', padding: '5px' }}
                />
              </div>
            ))}
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save New Recipe
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeModal;