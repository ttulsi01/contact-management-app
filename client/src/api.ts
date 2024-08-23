// client/src/api.ts
import axios from 'axios';

// Base URL for the API endpoints
const API_URL = 'http://localhost:5281/api/contacts';

// Fetch all contacts from the API
export const getContacts = () => axios.get(API_URL);

// Fetch a specific contact by ID from the API
export const getContact = (id: number) => axios.get(`${API_URL}/${id}`);

// Create a new contact using the API
export const createContact = (contact: any) => axios.post(API_URL, contact);

// Update an existing contact by ID using the API
export const updateContact = (id: number, contact: any) => axios.put(`${API_URL}/${id}`, contact);

// Delete a contact by ID using the API
export const deleteContact = (id: number) => axios.delete(`${API_URL}/${id}`);
