// src/utils/indexedDB.js
import { openDB } from 'idb';

// Initialize the IndexedDB
export const initDB = async () => {
  return openDB('RecipesDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('recipes')) {
        db.createObjectStore('recipes', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// Add a recipe to the database
export const addRecipe = async (recipe) => {
  const db = await initDB();
  return db.add('recipes', recipe);
};

// Fetch all recipes from the database
export const getRecipes = async () => {
  const db = await initDB();
  return db.getAll('recipes');
};

// Delete a recipe by ID
export const deleteRecipe = async (id) => {
  const db = await initDB();
  return db.delete('recipes', id);
};
