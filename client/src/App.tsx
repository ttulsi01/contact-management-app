import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import './styles.css';

// Main App component that sets up the routing and basic structure of the application
const App: React.FC = () => {
    return (
        // Router component to handle client-side routing
        <Router basename="/contact-management-app">
            <div className="app-container">
                <header className="app-header">
                    <h1>Contact Management App</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<ContactList />} />
                        <Route path="/create" element={<ContactForm />} />
                        <Route path="/edit/:id" element={<ContactForm />} />
                    </Routes>
                </main>
                <footer className="app-footer">
                    <p>© 2024 Tulsi Tailor. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;
