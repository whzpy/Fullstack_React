// src/utils/indexedDB.js
import { openDB } from 'idb';

// Initialize the IndexedDB
export const initDB = async () => {
  return openDB('FruitsDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Fruits')) {
        db.createObjectStore('Fruits', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// Add a Fruit to the database
export const addFruit = async (Fruit) => {
  const db = await initDB();
  return db.add('Fruits', Fruit);
};

// Edit a Fruit
export const editFruit = async (Fruit) => {
  if (!Fruit.id) {
    throw new Error('Cannot update a Fruit without an "id".');
  }
  const db = await initDB();
  try {
    await db.put('Fruits', Fruit); // Update the fruit by replacing the record with the same ID
    console.log(`Fruit with ID ${Fruit.id} updated successfully.`);
  } catch (error) {
    console.error('Failed to update fruit:', error);
    throw error;
  }
};

// Fetch all Fruits from the database
export const getFruits = async () => {
  const db = await initDB();
  return db.getAll('Fruits');
};

// Delete a Fruit by ID
export const deleteFruit = async (id) => {
  const db = await initDB();
  return db.delete('Fruits', id);
};
