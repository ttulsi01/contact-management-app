import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Get the root DOM element where the React app will be mounted
const container = document.getElementById('root');
if (container) {
    // If the root element is found, create a React root and render the App component
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error('Root element not found. Cannot render the application.');
}
