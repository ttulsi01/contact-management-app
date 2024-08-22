// // client/src/ContactList.tsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './styles.css';

// interface Contact {
//     id: number;
//     firstName: string;
//     lastName: string;
//     city: string;
//     state: string;
//     phoneNumber: string;
//   }  

//   const ContactList: React.FC = () => {
//     const [contacts, setContacts] = useState<Contact[]>([]);

//     useEffect(() => {
//         axios.get<Contact[]>('http://localhost:5281/api/contacts')
//         .then(response => setContacts(response.data))
//         .catch(error => console.error('Error fetching contacts', error));
//     }, []);

//     const handleDelete = (id: number) => {
//         axios.delete(`http://localhost:5281/api/contacts/${id}`)
//         .then(() => setContacts(prev => prev.filter(contact => contact.id !== id)))
//         .catch(error => console.error('Error deleting contact', error));
//     };

//     const formatPhoneNumber = (phoneNumber: string) => {
//         const cleaned = ('' + phoneNumber).replace(/\D/g, '');
//         const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
//         if (match) {
//         return `(${match[1]}) ${match[2]}-${match[3]}`;
//         }
//         return phoneNumber;
//     };
//     return (
//         <div className="contact-list-container">
//         <h1>Contacts</h1>
//         <Link to="/create" className="add-contact-link">Add New Contact</Link>
//         <table>
//             <thead>
//             <tr>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>City</th>
//                 <th>State</th>
//                 <th>Phone Number</th>
//                 <th>Actions</th>
//             </tr>
//             </thead>
//             <tbody>
//             {contacts.map(contact => (
//                 <tr key={contact.id}>
//                 <td>{contact.firstName}</td>
//                 <td>{contact.lastName}</td>
//                 <td>{contact.city}</td>
//                 <td>{contact.state}</td>
//                 <td>{formatPhoneNumber(contact.phoneNumber)}</td>
//                 <td>
//                     <Link to={`/edit/${contact.id}`} className="edit-link">Edit</Link>
//                     <button onClick={() => handleDelete(contact.id)} className="delete-button">Delete</button>
//                 </td>
//                 </tr>
//             ))}
//             </tbody>
//         </table>
//         </div>
//     );
// };

// export default ContactList;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    phoneNumber: string;
}  

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        axios.get<Contact[]>('http://localhost:5281/api/contacts')
            .then(response => setContacts(response.data))
            .catch(error => console.error('Error fetching contacts', error));
    }, []);

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:5281/api/contacts/${id}`)
            .then(() => setContacts(prev => prev.filter(contact => contact.id !== id)))
            .catch(error => console.error('Error deleting contact', error));
    };

    const formatPhoneNumber = (phoneNumber: string) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    };

    return (
        <div className="contact-list-container">
            <h1>Contacts</h1>
            <Link to="/create" className="add-contact-link">Add New Contact</Link>
            <div className="table-wrapper">
                <table className="contact-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact.id}>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.city}</td>
                                <td>{contact.state}</td>
                                <td>{formatPhoneNumber(contact.phoneNumber)}</td>
                                <td>
                                    <Link to={`/edit/${contact.id}`} className="edit-link">Edit</Link>
                                    <button onClick={() => handleDelete(contact.id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactList;


