// client/src/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5281/api/contacts';

export const getContacts = () => axios.get(API_URL);
export const getContact = (id: number) => axios.get(`${API_URL}/${id}`);
export const createContact = (contact: any) => axios.post(API_URL, contact);
export const updateContact = (id: number, contact: any) => axios.put(`${API_URL}/${id}`, contact);
export const deleteContact = (id: number) => axios.delete(`${API_URL}/${id}`);
