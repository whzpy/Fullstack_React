import React, { useState, useEffect } from 'react';
import '../App.css'
import { addRecipe, getRecipes, deleteRecipe } from '../utils/indexedDB';

function About() {
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [recipePrice, setRecipePrice] = useState('');

  // Fetch recipes from IndexedDB on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const data = await getRecipes();
    setRecipes(data);
  };

  const handleAddRecipe = async () => {
    if (recipeName && recipePrice) {
      await addRecipe({ name: recipeName, price: recipePrice });
      setRecipeName('');
      setRecipes('');
      fetchRecipes();
    }
  };

  const handleDeleteRecipe = async (id) => {
    await deleteRecipe(id);
    fetchRecipes();
  };

  return (
    <div>
      <h2 style={{ marginTop: '-250px' }}>Recipe Table __IndexedDB practice</h2>
      <div>
        <label style={{ marginRight: '3px' }}>Recipe Name </label>
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter recipe name"
          style={{ marginRight: '20px' }}
        />
        <label style={{ marginRight: '3px' }}>Recipe Price</label>
        <input
          type="number"
          value={recipePrice}
          onChange={(e) => setRecipePrice(e.target.value)}
          placeholder="Enter recipe price"
          style={{ marginRight: '20px' }}
        />
        <button onClick={handleAddRecipe} style={{ backgroundColor:"green"}}>Add Recipe</button>
      </div>
      <table border="1" style={{ marginTop: '20px', width: '95%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody >
          {Array.isArray(recipes) && recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.name}</td>
              <td>{recipe.price}</td>
              <td>
                <button onClick={() => handleDeleteRecipe(recipe.id)} style={{ backgroundColor:"orange"}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default About;