import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define interface for Contact object
interface Contact {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    contactFrequency: string;
    phoneNumber: string;
    [key: string]: any;
}

interface DropdownOptions {
    states: { key: string, value: string }[];
    contactFrequencies: { key: string, value: string }[];
}

const ContactForm: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the contact ID from URL params (if any)
    const navigate = useNavigate(); // Navigation hook for redirecting after form submission

    // State to hold contact details
    const [contact, setContact] = useState<Contact>({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        contactFrequency: '',
        phoneNumber: ''
    });

    const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>({
        states: [],
        contactFrequencies: []
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // Fetch dropdown options from API
        const fetchDropdownOptions = async () => {
            try {
                const response = await axios.get<DropdownOptions>('http://localhost:5281/api/contacts/dropdown-options');
                setDropdownOptions(response.data);
            } catch (error) {
                console.error('Error fetching dropdown options', error);
                setDropdownOptions({ states: [], contactFrequencies: [] }); // Fallback to empty arrays on error
            }
        };
    
        fetchDropdownOptions();
    
        // Fetch contact if in edit mode
        if (id) {
            axios.get<Contact>(`http://localhost:5281/api/contacts/${id}`)
                .then(response => setContact(response.data))
                .catch(error => console.error('Error fetching contact', error));
        }
    }, [id]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
    };

    // Handle phone number input formatting
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, ''); // Remove all non-digits
        if (value.length <= 3) {
            value = value.replace(/^(\d{0,3})/, '($1)');
        } else if (value.length <= 6) {
            value = value.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
        } else if (value.length <= 10) {
            value = value.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
        } else {
            value = value.substring(0, 14); // Restrict to 14 characters including formatting
        }

        setContact(prev => ({ ...prev, phoneNumber: value }));
    };

    // Validate form fields
    const validateForm = () => {
        let formIsValid = true;
        let errors: { [key: string]: string } = {};

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
        if (!emailRegex.test(contact.email)) {
            formIsValid = false;
            errors["email"] = "Please enter a valid email address with a supported domain (gmail.com, yahoo.com, outlook.com).";
        }

        // Phone number validation (assuming US format)
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneRegex.test(contact.phoneNumber)) {
            formIsValid = false;
            errors["phoneNumber"] = "Please enter a valid 10-digit phone number.";
        }

        // ZIP code validation (assuming US format)
        const zipRegex = /^\d{5}$/;
        if (!zipRegex.test(contact.zip)) {
            formIsValid = false;
            errors["zip"] = "Please enter a valid 5-digit ZIP code.";
        }

        setErrors(errors);
        return formIsValid;
    };

    // Validate that all fields are filled out
    const validateAllFields = () => {
        let isValid = true;
        Object.keys(contact).forEach(key => {
            if (contact[key] === '') {
                isValid = false;
                setErrors(prev => ({ ...prev, [key]: 'This field is required' }));
            }
        });
        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateAllFields() || !validateForm()) {
            return;
        }

        // If an ID exists, update the contact, otherwise create a new contact
        if (id) {
            axios.put(`http://localhost:5281/api/contacts/${id}`, contact)
                .then(() => {
                    alert('Contact updated successfully');
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error updating contact:', error);
                    alert('There was an error updating the contact.');
                });
        } else {
            axios.post('http://localhost:5281/api/contacts', contact)
                .then(() => {
                    alert('Contact created successfully');
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error creating contact:', error);
                    alert('There was an error creating the contact.');
                });
        }
    };

    // Render the form
    return (
        <div className="form-container">
            <h2>{id ? "Edit Contact" : "Create Contact"}</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={contact.firstName}
                        onChange={handleChange}
                        maxLength={20}
                        required
                    />
                    <span className="char-counter">{contact.firstName.length}/20</span>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={contact.lastName}
                        onChange={handleChange}
                        maxLength={20}
                        required
                    />
                    <span className="char-counter">{contact.lastName.length}/20</span>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={contact.street}
                        onChange={handleChange}
                        maxLength={100}
                        required
                    />
                    <span className="char-counter">{contact.street.length}/100</span>
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={contact.city}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />
                    <span className="char-counter">{contact.city.length}/50</span>
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select
                        id="state"
                        name="state"
                        value={contact.state}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select State</option>
                        {dropdownOptions.states && dropdownOptions.states.map((state, index) => (
                            <option key={index} value={state.key}>{state.value}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="contactFrequency">Contact Frequency</label>
                    <select
                        id="contactFrequency"
                        name="contactFrequency"
                        value={contact.contactFrequency}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Contact Frequency</option>
                        {dropdownOptions.contactFrequencies && dropdownOptions.contactFrequencies.map((frequency, index) => (
                            <option key={index} value={frequency.key}>{frequency.value}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={contact.phoneNumber}
                        onChange={handlePhoneChange}
                        maxLength={14}
                        required
                    />
                    {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                </div>
                <button type="submit" className="submit-button">Save</button>
            </form>
        </div>
    );
};

export default ContactForm;
