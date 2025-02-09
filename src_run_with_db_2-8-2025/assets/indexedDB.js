import { openDB } from 'idb';

export const initDB = async () => {
  return openDB('MyIndexedDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('contactTable')) {
        db.createObjectStore('contactTable', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// Add a contact info to database
export const addContact = async (data) => {
  const db = await initDB();
  return db.add
};

// Get all data
export const getAllContacts = async () => {
  const db = await initDB();
  return db.getAll('contactTable');
};

// Update data
export const updateContact = async (id, updatedData) => {
  const db = await initDB();
  const tx = db.transaction('contactTable', 'readwrite');
  const store = tx.store;
  const data = await store.get(id);
  Object.assign(data, updatedData);
  await store.put(data);
  await tx.done;
};

// Delete data
export const deleteContact = async (id) => {
  const db = await initDB();
  return db.delete('contactTable', id);
};
