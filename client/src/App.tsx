// client/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import './styles.css';

const App: React.FC = () => {
    return (
        <Router basename="/contact-management-app">
            <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/create" element={<ContactForm />} />
                <Route path="/edit/:id" element={<ContactForm />} />
            </Routes>
        </Router>
    );
};

export default App;
