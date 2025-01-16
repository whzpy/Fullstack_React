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

// Edit a Fruit by ID
export const editFruit = async (Fruit) => {
  const db = await initDB();
  return db.put('Fruits', Fruit);
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
